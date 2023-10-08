const express = require("express");
const router = express.Router();
const {createJob} = require("../controllers/jobs/postJob");
const {getAllJobs} = require("../controllers/jobs/getJobs");


router.post('/post-new-job', createJob);
router.get('/jobs', getAllJobs);


module.exports = router;