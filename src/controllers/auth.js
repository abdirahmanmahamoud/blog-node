import db from "../../lib/db.js";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  res.send("login controller");
};

export const signup = (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check if the user already exists
  const query = `SELECT * FROM user WHERE email = '${email}'`; // Prepared statement with placeholder
  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${hashPassword}')`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }
    });

    //  todo: generate token
    console.log(query);

    res.status(200).json({ message: "User signed up successfully" });
  });
};
