const express = require("express");
const router = express.Router();

const projects = require("../controllers/projectController.js");
const { isLoggedIn } = require("../middleware/authMiddleware.js");

router.route("/").get(projects.getProjects).post(projects.addProject);
router.route("/:id").get(projects.getProjectById).patch(projects.updateProject).delete(projects.deleteProject);

module.exports = router;
