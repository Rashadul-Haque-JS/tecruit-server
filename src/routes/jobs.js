const express = require("express");
const router = express.Router();
const {createJob} = require("../controllers/jobs/postJob");
const {getJobs} = require("../controllers/jobs/getJobs");
const checkAuthToken = require("../middleware/auth/checkToken");
const {getJobListByCompany,getJobListById} = require("../controllers/jobs/getJobs");
const {updateJob} = require("../controllers/jobs/updateJob");
const {deleteJob} = require("../controllers/jobs/deleteJob");

router.post('/jobs',checkAuthToken, createJob);
router.get('/jobs', getJobs);
router.get('/companies/jobs', checkAuthToken, getJobListByCompany);
router.get('/companies/jobs/:id', checkAuthToken, getJobListById); 
router.put('/companies/jobs/:id', checkAuthToken, updateJob); 
router.delete('/companies/jobs/delete', checkAuthToken, deleteJob); 


module.exports = router;