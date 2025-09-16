import prisma from "../config/db.js";

// Create Poll with Options
export const createPoll = async (req, res) => {
  try {
    const { question, options, creatorId } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ error: "Poll must have a question and at least 2 options" });
    }

    const poll = await prisma.poll.create({
      data: {
        question,
        isPublished: true,
        creator: { connect: { id: creatorId } },
        options: {
          create: options.map((text) => ({ text })),
        },
      },
      include: { options: true },
    });

    res.status(201).json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create poll" });
  }
};

// Fetch Poll with Options
export const getPoll = async (req, res) => {
  try {
    const { id } = req.params;

    const poll = await prisma.poll.findUnique({
      where: { id: Number(id) },
      include: { options: { include: { votes: true } }, creator: true },
    });

    if (!poll) return res.status(404).json({ error: "Poll not found" });

    // Format result with vote counts
    const formattedPoll = {
      id: poll.id,
      question: poll.question,
      creator: poll.creator.name,
      createdAt: poll.createdAt,
      options: poll.options.map((opt) => ({
        id: opt.id,
        text: opt.text,
        votes: opt.votes.length,
      })),
    };

    res.json(formattedPoll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch poll" });
  }
};
