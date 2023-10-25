const express = require("express");
const router = express.Router();
const checkAuthToken = require("../middleware/auth/checkToken");
const {handleDuplicateSignup,findApplicantOrCompany} = require("../middleware/auth/authMiddlewares");
const { login } = require("../controllers/auth/loginController");
const {createSubscriber} = require("../controllers/auth/subscribers");
const {
  applicantSignup,
  getApplicant,
  updateApplicant,
  deleteApplicant,
} = require("../controllers/auth/applicantAuth");

const {
    companySignup,
    getCompany,
    updateCompany,
    deleteCompany
} = require("../controllers/auth/companyAuth");



router.post("/login",findApplicantOrCompany, login);
router.post("/applicants",handleDuplicateSignup, applicantSignup);
router.get("/applicants",checkAuthToken, getApplicant);
router.put("/applicants",checkAuthToken, updateApplicant);
router.delete("/applicants",checkAuthToken, deleteApplicant);

router.post("/subscribers", createSubscriber);

router.post("/companies",handleDuplicateSignup, companySignup);
router.get("/companies",checkAuthToken, getCompany);
router.put("/companies", checkAuthToken, updateCompany);
router.delete("/companies",checkAuthToken, deleteCompany);

module.exports = router;
