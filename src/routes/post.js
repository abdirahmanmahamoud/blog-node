import express from "express";
import {
  postCreate,
  postDelete,
  postUpdate,
  selectPostById,
  selectPosts,
} from "../controllers/post.js";
import { middlewareAdmin } from "../../lib/middlewares.js";

const router = express.Router();

router.post("/", middlewareAdmin, postCreate);
router.get("/", selectPosts);
router.get("/:id", selectPostById);
router.put("/:id", middlewareAdmin, postUpdate);
router.delete("/:id", middlewareAdmin, postDelete);

export default router;
