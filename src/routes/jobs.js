const express = require("express");
const router = express.Router();
const {createJob} = require("../controllers/jobs/postJob");
const {getJobs} = require("../controllers/jobs/getJobs");


router.post('/jobs', createJob);
router.get('/jobs', getJobs);


module.exports = router;