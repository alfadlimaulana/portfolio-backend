const Project = require("../models/Project");
const { getErrorMessage } = require("../utils/helper.js");

module.exports.getProjects = async (req, res) => {
  try {
    const data = await Project.find();
    res.status(200).json({
      status: "success",
      data: data,
      message: "Data berhasil diambil",
    });
  } catch (error) {
    res.status(404).send({
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
    const data = await Project.findOne({ id: parseInt(req.params.id) });
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
    const data = await Project.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body);
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
    const data = await Project.findOneAndDelete({ id: parseInt(req.params.id) });
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
