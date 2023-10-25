const Job = require("../../models/jobs");
const JobListing = require("../../models/jobListing");

const deleteJob = async (req, res) => {
    const {id} = req.body; 
  
    try {
      const deletedJob = await Job.deleteOne({ _id: id });
  
      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      const removedFromListing = await JobListing.deleteOne({ jobId: id });
  
      if (!removedFromListing) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      return res.status(200).json({ message: "Job deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = {
    deleteJob,
  };
  