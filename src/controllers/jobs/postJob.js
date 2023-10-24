const Job = require('../../models/jobs');
const JobListing = require('../../models/jobListing');
const Company = require('../../models/company');
const jwt = require('jsonwebtoken');

const createJob = async (req, res) => {
  try {
    let authCompany;
    const email = req.token;
    const currentCompany = await Company.findOne({ email });
    if (!currentCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }else{
      authCompany = { id: currentCompany._id };
    }

    const {
      jobTitle,
      category,
      subCategory,
      company,
      country,
      city,
      description,
      position,
      workTime,
      type,
      published_on,
      last_date,
      application_options,
      email_to_applications,
      application_url,
    } = req.body;

    

    // Create a new job using the Job model
    const newJob = new Job({
      jobTitle,
      category,
      subCategory,
      company,
      country,
      city,
      description,
      position,
      workTime,
      type,
      published_on,
      last_date,
      application_options,
      email_to_applications,
      application_url,
    });

    const newJobListing = new JobListing({
      jobTitle,
      published_on,
      companyId: authCompany.id,
    });
    // Save the new job to the database
    await newJob.save();
    await newJobListing.save();

    return res.status(201).json({ message: 'Job listing created successfully', job: newJob });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { createJob};
