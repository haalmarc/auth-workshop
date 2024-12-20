import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

interface User {
  username: string;
  id: string;
  password: string;
}

const SECRET_KEY = "your_secret_key";

const USERS: User[] = [
  { id: "1", username: "user1", password: "123456" },
  { id: "2", username: "user2", password: "123456" },
];

app.get("/users", (req, res) => {
  res.json(USERS);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

interface CustomJwtPayload {
  id: number;
  username: string;
}

app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as CustomJwtPayload;
    res.json({ message: `Hello, ${decoded.username}!`, data: decoded });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
