const Job = require('../../models/jobs');
const sanitizeHtml = require('sanitize-html'); // Import the sanitize-html library

// Controller function to get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found' });
    }

    // Sanitize the description field to remove HTML tags
    const sanitizedJobs = jobs.map((job) => ({
      ...job._doc,
      description: sanitizeHtml(job.description),
    }));

    res.status(200).json(sanitizedJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllJobs };

