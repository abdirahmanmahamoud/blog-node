import db from "../../lib/db.js";

export const postCreate = (req, res) => {
  const { title, description, image } = req.body;

  if (!title || !description || !image) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const query = `INSERT INTO post (title, description,image) VALUES ('${title}', '${description}', '${image}')`; // Prepared statement with placeholder
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    return res
      .status(200)
      .json({ message: "Post created successfully", postId: result.insertId });
  });
};

export const selectPosts = (req, res) => {
  const query = `SELECT * FROM post`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.status(200).json(result);
  });
};

export const selectPostById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "required param id" });
  }

  const query = `SELECT * FROM post WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(result[0]);
  });
};

export const postUpdate = (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;

  if (!id || !title || !description || !image) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const query = `SELECT * FROM post WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const query = `UPDATE post SET title = '${title}', description = '${description}', image = '${image}' WHERE id = ${id}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }
      return res.status(200).json({ message: "Post updated successfully" });
    });
  });
};

export const postDelete = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "required param id" });
  }

  const query = `SELECT * FROM post WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const query = `DELETE FROM post WHERE id = ${id}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }
      return res.status(200).json({ message: "Post deleted successfully" });
    });
  });
};
