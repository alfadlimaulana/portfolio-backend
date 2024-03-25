const express = require("express");
const router = express.Router();

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = (new Date()).getMilliseconds()
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

function fileFilter (req, file, cb) {
  if (file.mimetype === "image/png" 
      || file.mimetype === "image/jpg" 
      || file.mimetype === "image/jpeg"
      || file.mimetype === "image/webp"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

upload = multer({ storage: storage, fileFilter: fileFilter }).array('images')

const projects = require("../controllers/projectController.js");
const { isLoggedIn } = require("../middleware/authMiddleware.js");

router.route("/").get(projects.getProjects).post(upload, isLoggedIn, projects.addProject);
router.route("/:id").get(projects.getProjectById).patch(upload, projects.updateProject).delete(isLoggedIn, projects.deleteProject);

module.exports = router;
