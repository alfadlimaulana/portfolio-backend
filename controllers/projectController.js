const Project = require("../models/Project");
const { getErrorMessage } = require("../utils/helper.js");
const mongoose = require('mongoose')

module.exports.getProjects = async (req, res) => {
  try {
    const data = await Project.find();
    res.status(200).json({
      status: "success",
      data: data,
      message: "Data berhasil diambil",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      errors: getErrorMessage(error),
    });
  }
};

module.exports.addProject = async (req, res) => {
  try {
    const data = await Project.create(req.body);
    res.status(201).json({
      status: "success",
      data: data,
      message: "Data berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      errors: getErrorMessage(error),
    });
  }
};

module.exports.getProjectById = async (req, res) => {
  try {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        status:"failed",
        errors: "Project Not found"
      })
    }

    const data = await Project.findOne({ id: parseInt(id) });

    if (!data) {
      res.status(404).json({
        status:"failed",
        errors: "Project Not found"
      })
    }

    res.status(200).json({
      status: "success",
      data: data,
      message: "Data berhasil diambil",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      errors: getErrorMessage(error),
    });
  }
};

module.exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        status: "failed",
        errors: "Project Not Found"
      })
    }
    
    const data = await Project.findOneAndUpdate({ id }, req.body);
    
    if (!data) {
      res.status(404).json({
        status:"failed",
        errors: "Project Not found"
      })
    }

    res.status(200).json({
      status: "success",
      data: data,
      message: "Data berhasil diubah",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      errors: getErrorMessage(error),
    });
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        status: "failed",
        errors: "Project Not Found"
      })
    }

    const data = await Project.findOneAndDelete({ id: parseInt(id) });
    
    if (!data) {
      res.status(404).json({
        status:"failed",
        errors: "Project Not found"
      })
    }
    
    res.status(200).json({
      status: "success",
      data: data,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      errors: getErrorMessage(error),
    });
  }
};
