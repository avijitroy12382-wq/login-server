const express = require("express");
const app = express();

app.use(express.json());

let users = [
    { key: "1234", hwid: "", expire: "2026-12-31" }
];

app.post("/login", (req, res) => {
    const { key, hwid } = req.body;

    let user = users.find(u => u.key === key);

    if (!user) {
        return res.json({ success: false, message: "Invalid Key" });
    }

    if (new Date(user.expire) < new Date()) {
        return res.json({ success: false, message: "Key Expired" });
    }

    if (user.hwid === "") {
        user.hwid = hwid;
    } else if (user.hwid !== hwid) {
        return res.json({ success: false, message: "Device Mismatch" });
    }

    return res.json({ success: true });
});

app.listen(3000, () => console.log("Server running"));
