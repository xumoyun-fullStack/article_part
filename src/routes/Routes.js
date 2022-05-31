const { AddArticle } = require("../Controllers/AdminController");
const { GetArticles } = require("../Controllers/ArticlesController");
const { AddComment } = require("../Controllers/CommentController");
const { Signup, Login, VerifyMail } = require("../Controllers/UsersController");
const router = require("express").Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AdminMiddleware = require("../middlewares/AdminMiddleware");

router.get("/", GetArticles);
router.post("/signup", Signup);
router.get("/verify/:id", VerifyMail);
router.post("/login", AuthMiddleware, Login);
router.post("/comment", AuthMiddleware, AddComment);

router.post("/admin/create_article", AuthMiddleware, AdminMiddleware, AddArticle);

module.exports = {
    path: "/",
    router
}