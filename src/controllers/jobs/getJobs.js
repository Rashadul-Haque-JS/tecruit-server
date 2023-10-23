
const Job = require('../../models/jobs');

const getJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
  
      return res.status(200).json({ jobs });
    } catch (error) {
      console.error('Error in getJobs controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
    getJobs
  }