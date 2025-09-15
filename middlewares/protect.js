const db = require("../db/models/index");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await db.User.findByPk(decoded.id);
    next();
  } catch (err) {
    next(err);
  }
};
