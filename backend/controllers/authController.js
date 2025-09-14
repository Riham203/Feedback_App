const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

function getToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// --- Signup ---
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    if (!passwordRegex.test(password))
      return res
        .status(400)
        .json({ message: "Password does not meet requirements" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    res.json({
      token: getToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Login ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.blocked) return res.status(403).json({ message: "Account blocked" });

    res.json({
      token: getToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Get Profile ---
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// --- Update Profile ---
exports.updateProfile = async (req, res) => {
  try {
    const updates = ["name", "phone", "dob", "address", "avatarUrl"];
    updates.forEach((field) => {
      if (req.body[field] !== undefined) {
        req.user[field] = req.body[field];
      }
    });
    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Change Password ---
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(
      currentPassword,
      req.user.password || ""
    );
    if (!isMatch)
      return res.status(400).json({ message: "Current password incorrect" });

    if (!passwordRegex.test(newPassword))
      return res
        .status(400)
        .json({ message: "New password not strong enough" });

    req.user.password = await bcrypt.hash(newPassword, 10);
    await req.user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};