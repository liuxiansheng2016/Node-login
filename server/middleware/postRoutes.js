const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");
const router = express.Router();
// 公共路由
router.get("/posts", postController.getAllPosts);
// 受保护路由
router.post("/posts", authMiddleware, postController.createPost);
router.put("/posts/:id", authMiddleware, postController.updatePost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);
module.exports = router;
