const Job = require('../../models/jobs');
// const sanitizeHtml = require('sanitize-html'); 

const createJob = async (req, res) => {
  try {
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

    // Save the new job to the database
    await newJob.save();

    return res.status(201).json({ message: 'Job listing created successfully', job: newJob });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { createJob};
