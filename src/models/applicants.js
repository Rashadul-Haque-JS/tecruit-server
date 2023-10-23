const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Optional: Ensure email is unique
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value), // Validate as an email address
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 6;
      },
      message: 'Password must be at least 6 characters long',
    },
  },
  type: {
    type: String,
    required: true,
    enum: ['applicant'],
  },
});

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
