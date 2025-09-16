import prisma from "../config/db.js";

// Cast a Vote
export const castVote = async (req, res) => {
  try {
    const { userId, pollOptionId } = req.body;

    if (!userId || !pollOptionId) {
      return res.status(400).json({ error: "userId and pollOptionId are required" });
    }

    // ✅ Validate user exists
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // ✅ Validate poll option exists
    const optionExists = await prisma.pollOption.findUnique({ where: { id: pollOptionId } });
    if (!optionExists) {
      return res.status(400).json({ error: "Poll option does not exist" });
    }

    // ✅ Prevent double voting
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_pollOptionId: { userId, pollOptionId },
      },
    });

    if (existingVote) {
      return res.status(400).json({ error: "User has already voted for this option" });
    }

    // ✅ Cast vote
    const vote = await prisma.vote.create({
      data: {
        userId,
        pollOptionId,
      },
      include: { pollOption: { include: { poll: true } } },
    });

    // ✅ Get updated results
    const pollId = vote.pollOption.pollId;
    const updatedPoll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: { include: { votes: true } },
      },
    });

    const pollResults = {
      id: updatedPoll.id,
      question: updatedPoll.question,
      options: updatedPoll.options.map((opt) => ({
        id: opt.id,
        text: opt.text,
        votes: opt.votes.length,
      })),
    };

    // ✅ Broadcast results via WebSocket
    req.io.to(`poll_${pollId}`).emit("voteUpdate", pollResults);

    res.status(201).json({ message: "Vote cast successfully", pollResults });
  } catch (error) {
    console.error("Vote error:", error);
    res.status(500).json({ error: error.message });
  }
};
