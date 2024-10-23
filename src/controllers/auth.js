import db from "../../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const query = `SELECT * FROM user WHERE email = '${email}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!result || result.length === 0) {
      return res
        .status(401) // Use 401 (Unauthorized) for both cases if credentials are wrong
        .json({ message: "email or password is incorrect" });
    }

    // console.log(result);

    const checkPassword = bcrypt.compareSync(password, result[0].password);

    console.log(checkPassword);

    if (!checkPassword) {
      return res
        .status(401) // Same status as above for consistency
        .json({ message: "email or password is incorrect" });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        role: result[0].role,
        token: generateToken(result[0].id),
      },
    });
  });
};

export const signup = (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Check if the user already exists
  const query = `SELECT * FROM user WHERE email = '${email}'`; // Prepared statement with placeholder
  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "User email already exists" });
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

    const queryEmail = `SELECT * FROM user WHERE email = '${email}'`;
    db.query(queryEmail, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      return res.status(200).json({
        message: "User created successfully",
        user: {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          role: result[0].role,
          token: generateToken(result[0].id),
        },
      });
    });

    // res.status(200).json({ message: "User signed up successfully" });
  });
};
