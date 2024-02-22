import express from "express";
import * as postController from "../controller/posts";

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.get("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;
