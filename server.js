const express = require("express");
const app = express();

app.use(express.json());

// Home route (এইটার জন্যই এখন error আসছিল)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "Login success" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
