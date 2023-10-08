const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: "data/IT",
  },
  position: {
    type: String,
    required: true,
    enum: ["entry","internship", "intermediate", "senior"],
  },
  company: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
    default: "631ce74c97675e3ae3f45928",
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  workTime: {
    type: String,
    required: true,
    enum: ["full", "part"],
  },

  type: {
    type: [String],
    enum: ["onsite", "hybrid", "remote"],
    required: true,
  },

  published_on: {
    type: Date,
    required: true,
  },

  last_date: {
    type: Date,
    required: true,
  },
  application_options: {
    type: String,
    required: true,
    enum: ["email", "onlineForm"],
  },
  email_to_applications: {
    type: String,
    required: function () {
      return this.application_options === "email";
    },
  },
  application_url: {
    type: String,
    required: function () {
      return this.application_options === "onlineForm";
    },
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
