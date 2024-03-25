const mongoose = require("mongoose");

const projectLinkSchema = new mongoose.Schema({
  github: {
    type: String,
    min: 2,
    max: 64,
    unique: true,
    sparse: true
  },
  live: {
    type: String,
    min: 2,
    max: 64,
    unique: true,
    sparse: true
  },
});

const jobDescSchema = new mongoose.Schema({
  desc: {
    type: String,
    min: 20,
  },
});

const techStackSchema = new mongoose.Schema({
  tech: {
    type: String,
    min: 2,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 2,
    max: 32,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    min: 2,
    max: 32,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  desc: {
    type: String,
    min: 2,
    required: true,
  },
  jobDesc: {
    type: [jobDescSchema],
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function (images) {
        return images.every((image) => image.length > 2);
      },
      message: (props) => `Panjang ${props.value} harus lebih dari 2 karakter`,
    },
  },
  link: {
    type: projectLinkSchema,
  },
  techStack: {
    type: [techStackSchema],
  },
}, {timestamps: true});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
