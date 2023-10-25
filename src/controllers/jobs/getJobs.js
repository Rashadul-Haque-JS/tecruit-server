
const Job = require('../../models/jobs');
const JobListing = require("../../models/jobListing");
const Company = require('../../models/company');

const getJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
  
      return res.status(200).json({ jobs });
    } catch (error) {
      console.error('Error in getJobs controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getJobListByCompany = async (req, res) => {
    const email = req.email;
    try{
        const result = await Company.findOne({ email });
    if (!result) {
      return res.status(404).json({ message: "Company not found" });
    }
    const jobList = await JobListing.find({ companyId: result._id });
    return res.status(200).json(jobList);
    }catch (error) {
    return res.status(500).json({ message: "Internal server error" });}
}


const getJobListById = async (req, res) => {
    const id = req.params.id;
    try{
    const job = await Job.findOne({ _id: id });
    return res.status(200).json(job);
    }catch (error) {
        console.log(error);
    return res.status(500).json({ message: "Internal server error" });}
}

  module.exports = {
    getJobs,
    getJobListByCompany,
    getJobListById,
  }