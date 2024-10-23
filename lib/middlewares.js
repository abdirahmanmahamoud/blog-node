import jwt from "jsonwebtoken";
import db from "./db.js";
export const middlewareAdmin = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token expired" });
    }

    const { id } = decoded;

    const query = `SELECT * FROM user WHERE id = ${id} and role = 'admin'`;

    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        next();
      } else {
        return res.status(401).json({ message: "not admin" });
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
