const mongoose = require("mongoose");

const projectLinkSchema = new mongoose.Schema({
  github: {
    type: String,
    min: 2,
    max: 64,
    unique: true,
  },
  live: {
    type: String,
    min: 2,
    max: 64,
    unique: true,
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
    required: true,
  },
  desc: {
    type: String,
    min: 2,
    required: true,
  },
  jobDesc: {
    type: [String],
    required: true,
    validate: {
      validator: function (texts) {
        return texts.every((text) => text.length > 2);
      },
      message: (props) => `Panjang ${props.value} harus lebih dari 2 karakter`,
    },
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
    type: [String],
    required: true,
    validate: {
      validator: function (emails) {
        return emails.every((email) => email.length > 2 && email.length < 16);
      },
      message: (props) => `Panjang ${props.value} harus lebih dari 2 karakter dan kurang dari 16 karakter`,
    },
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
