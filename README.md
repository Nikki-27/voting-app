# 🗳️ Voting App

A backend service for creating polls, casting votes, and streaming live results in real-time.  
Built with **Node.js, Express, PostgreSQL, Prisma, and Socket.IO**.

This project is my submission for the **Move37 Ventures Backend Developer Challenge**.

---

## 🌟 Features

- 👤 User registration and retrieval
- 📊 Create polls with multiple options
- 🗳️ Cast votes (prevents duplicate votes)
- ⚡ Real-time updates via WebSockets (`voteUpdate`)
- ✅ Clean REST API + WebSocket hybrid

---

## 🛠️ Tech Stack

- **Backend** → Node.js + Express
- **Database** → PostgreSQL
- **ORM** → Prisma
- **Real-time layer** → Socket.IO
- **Auth & Security** → bcrypt for password hashing
- **Dev tools** → nodemon, dotenv

---

## 📂 Project Structure

```
src/
├── app.js # Express app setup
├── server.js # Server + WebSocket
├── config/db.js # Prisma client
├── controllers/ # Route logic
├── routes/ # Express routes
└── ...
prisma/
├── schema.prisma # Database schema
└── migrations/ # DB migrations
docs/
└── screenshots/ # Images used in README
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Nikki-27/voting-app.git
cd voting-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a .env file in the root directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/pollingdb?schema=public"
```

### 4. Run migrations

```bash
npx prisma migrate dev --name init
```

(Optional) Explore database with:

```bash
npx prisma studio
```

### 5. Start the app

```bash
npm run dev
```

Server will run at 👉 http://localhost:5000

---

## 📡 API Endpoints

### 👤 Users

POST /api/users → create user

```json
{
  "name": "Nikita",
  "email": "nikita@example.com",
  "password": "secure123"
}
```

GET /api/users/:id → get user by ID

### 📊 Polls

POST /api/polls → create poll with options

```json
{
  "question": "Which DB do you like most?",
  "options": ["PostgreSQL", "MongoDB", "MySQL"],
  "creatorId": 1
}
```

GET /api/polls/:id → get poll + options + vote counts

### 🗳️ Votes

POST /api/votes → cast a vote

```json
{
  "userId": 1,
  "pollOptionId": 2
}
```

---

## 🔌 WebSocket Usage

```js
const socket = io("http://localhost:5000");

// Join a poll room
socket.emit("joinPoll", 1);

// Listen for updates
socket.on("voteUpdate", (data) => {
  console.log("Live results:", data);
});
```

When someone votes, everyone in the same poll room gets real-time results 🎉

---

## 🌟 Demo Screenshots

📊 Creating a poll

🗳️ Casting a vote

⚡ Live updates in browser client

---

## ✅ Why this project matters

This challenge was about building something robust, clean, and real-world ready:

A clear relational schema with Prisma

REST APIs that handle validation & errors

Real-time results without page refresh

Easy setup with a friendly README

---

## 📌 Final Note

Thank you for reviewing my project 🙏
I’ve really enjoyed building this, and I’d love to bring the same energy, clarity, and engineering discipline to the Move37 Ventures team.
