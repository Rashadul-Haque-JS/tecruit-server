const Job = require('../../models/jobs');
const createJob = async (req, res) => {
    try {
      // Extract job data from the request body
      const {
        jobTitle,
        category,
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
  
      // Create a new job document
      const job = new Job({
        jobTitle,
        category,
        company,
        country,
        city,
        description,
        position,
        workTime,
        type,
        published_on: new Date(published_on),
        last_date: new Date(last_date),
        application_options,
        email_to_applications,
        application_url,
      });
  
      // Save the job to the database
      const savedJob = await job.save();
  
      res.status(201).json({message:'Successfully created job'});
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Unable to create job' });
    }
  };
  
  module.exports = {createJob};