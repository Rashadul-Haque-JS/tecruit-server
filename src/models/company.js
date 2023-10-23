const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
 companyName:{
    type:String,
    required:true,
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
      validator: (value) => value.length >= 6, // Ensure password length is at least 6 characters
      message: 'Password must be at least 6 characters long',
    },
  },
  street: {
    type: String,
    required: true,
  },
  post:{
    type: String,
    required: true,
  },
    city: {
        type: String,
        required: true,
        
    },
    country: {
        type: String,
        required: true,
       
    },
    type: {
        type: String,
        required: true,
        enum: ['company'],
      },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
