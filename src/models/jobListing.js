const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  published_on: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
    required: true,
  },
  // Other fields related to the job listing, such as job description, location, etc.
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;
