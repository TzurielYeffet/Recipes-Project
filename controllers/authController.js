const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/models/index.js");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = "1h";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = db.User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "User created", userId: newUser.user_id });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.match(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {registerUser,loginUser}
