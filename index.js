import express from "express";
import autoRouter from "./src/routes/auth.js";

const app = express();

app.use(express.json());

app.use("/auth", autoRouter);

app.get("/", (req, res) => {
  res.send("Hello World 23");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
