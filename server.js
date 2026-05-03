const express = require("express");
const app = express();

app.use(express.json());

let keys = [];

// Home
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// Key generate
app.post("/generate", (req, res) => {
  const key = Math.random().toString(36).substring(2, 10);

  keys.push({
    key,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    devices: [],
    maxDevices: 2
  });

  res.json({ key });
});

// Key check
app.post("/key", (req, res) => {
  const { key, deviceId } = req.body;

  const found = keys.find(k => k.key === key);

  if (!found) return res.json({ success: false });

  if (Date.now() > found.expiresAt) {
    return res.json({ success: false, message: "Expired" });
  }

  if (!found.devices.includes(deviceId)) {
    if (found.devices.length >= found.maxDevices) {
      return res.json({ success: false, message: "Limit reached" });
    }
    found.devices.push(deviceId);
  }

  res.json({ success: true });
});

app.listen(3000);
