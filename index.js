import express from "express";
import autoRouter from "./src/routes/auth.js";
import postRouter from "./src/routes/post.js";

const app = express();

app.use(express.json());

app.use("/auth", autoRouter);
app.use("/post", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World 23");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
