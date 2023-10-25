
const Job = require('../../models/jobs');

const updateJob = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body; 
  try {
    const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({message: "Job updated"});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  updateJob,
}
