const Project = require("../models/Project");
const { getErrorMessage } = require("../utils/helper.js");
const mongoose = require('mongoose')

module.exports.getProjects = async (req, res) => {
  try {
    const data = await Project.find().select('title images');

    const transformedData = data.map(project => ({
      title: project.title,
      image: project.images[0]
    }));

    res.status(200).json({
      status: "success",
      data: transformedData,
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
    let data = req.body
    const file = (req.files).map((file) => file.path)

    data = { ...data, images: file}
    const createdData = await Project.create(data);
    res.status(201).json({
      status: "success",
      data: createdData,
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

    const data = await Project.findById(id, {projection: {_id: 0}});

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
    let data = req.body

    if (!req.files.length == 0) {
      const file = (req.files).map((file) => file.path)
      data = { ...data, images: file}
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        status: "failed",
        errors: "Project Not Found"
      })
    }
    
    const project = await Project.findByIdAndUpdate(id, data, {new: true});
    
    if (!project) {
      res.status(404).json({
        status:"failed",
        errors: "Project Not found"
      })
    }

    res.status(200).json({
      status: "success",
      data: project,
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

    const data = await Project.findByIdAndDelete(id);
    
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
