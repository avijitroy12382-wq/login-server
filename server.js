const express = require("express");
const app = express();

app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ================= KEY SYSTEM =================

// Example keys (তুমি চাইলে add/change করতে পারো)
let keys = {
  "ABC123": {
    expire: Date.now() + 60 * 60 * 1000, // 1 hour
    devices: [],
    maxDevices: 1
  },
  "VIP999": {
    expire: Date.now() + 24 * 60 * 60 * 1000, // 24 hour
    devices: [],
    maxDevices: 2
  }
};

// Key check API
app.post("/key", (req, res) => {
  const { key, deviceId } = req.body;

  if (!key || !deviceId) {
    return res.json({ success: false, message: "Key & Device ID required" });
  }

  const data = keys[key];

  if (!data) {
    return res.json({ success: false, message: "Invalid key ❌" });
  }

  // Expire check
  if (Date.now() > data.expire) {
    return res.json({ success: false, message: "Key expired ⏳" });
  }

  // Device already added?
  if (!data.devices.includes(deviceId)) {
    // Limit check
    if (data.devices.length >= data.maxDevices) {
      return res.json({ success: false, message: "Device limit reached ❌" });
    }
    data.devices.push(deviceId);
  }

  res.json({ success: true, message: "Access granted ✅" });
});

// ==============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
