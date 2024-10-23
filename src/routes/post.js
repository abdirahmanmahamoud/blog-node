import express from "express";
import { postCreate } from "../controllers/post.js";
import { middlewareAdmin } from "../../lib/middlewares.js";

const router = express.Router();

router.post("/add", middlewareAdmin, postCreate);

// router.post("/signup", signup);

export default router;
