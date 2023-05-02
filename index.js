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
  res.json({
    success: true,
    message: "Sucesso!",
  });
});

//  ===========   GETS   ================
app.get("/profile", (req, res) => {
  const q = "SELECT * FROM profile";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/skills", (req, res) => {
  const q = "SELECT * FROM skills";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/education", (req, res) => {
  const q = "SELECT * FROM education";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/experience", (req, res) => {
  const q = "SELECT * FROM experience";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/project", (req, res) => {
  const q = "SELECT * FROM projects";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
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
