const express = require("express");
const router = express.Router();
const {createJob} = require("../controllers/jobs/postJob");
const {getJobs} = require("../controllers/jobs/getJobs");
const checkAuthToken = require("../middleware/auth/checkToken");
const {getJobListByCompany} = require("../controllers/jobs/getJobs");

router.post('/jobs',checkAuthToken, createJob);
router.get('/jobs', getJobs);
router.get('/companies/jobs', checkAuthToken, getJobListByCompany);


module.exports = router;