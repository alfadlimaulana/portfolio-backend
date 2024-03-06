const express = require("express");
const router = express.Router();

const projects = require("../controllers/projectController.js");
const { isLoggedIn } = require("../middleware/authMiddleware.js");

router.route("/").get(projects.getProjects).post(isLoggedIn, projects.addProject);
router.route("/:id").get(projects.getProjectById).put(isLoggedIn, projects.updateProject).delete(isLoggedIn, projects.deleteProject);

module.exports = router;
