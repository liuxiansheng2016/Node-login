exports.getAllPosts = (req, res) => {
  res.send("Public posts");
};
exports.createPost = (req, res) => {
  res.send("Post created");
};
exports.updatePost = (req, res) => {
  res.send("Post updated");
};
exports.deletePost = (req, res) => {
  res.send("Post deleted");
};
