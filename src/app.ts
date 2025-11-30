import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/auth/signup", (req, res) => {
  res.send("signup endpoint!");
});

app.get("/api/auth/login", (req, res) => {
  res.send("login endpoint!");
});

app.get("/api/auth/logout", (req, res) => {
  res.send("logout endpoint!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
