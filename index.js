import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

const users = [];
const db = mysql.createConnection({
  host: "db4free.net",
  user: "llucasgomes",
  password: "_*W5DvSvT2$mvmW",
  database: "portiflio",
  port: 3306,
});

app.get("/", (req, res) => {
  return res.json("hello world");
});

app.get("/users", (req, res) => {
  return res.json(users);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: Math.random().toString(36),
    name,
    email,
  };

  users.push(newUser);
  return res.json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return res.status(404).json({ error });
  }

  users.splice(index, 1);
  return res.status(204).json();
});

app.listen(port, () => console.log(`listening on ${port}`));
