const express = require("express");
const router = express.Router();

const {handleDuplicateSignup,findApplicantOrCompany} = require("../middleware/auth/authMiddlewares");
const { login } = require("../controllers/auth/loginController");

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
router.get("/applicants", getApplicant);
router.put("/applicants", updateApplicant);
router.delete("/applicants", deleteApplicant);

router.post("/companies",handleDuplicateSignup, companySignup);
router.get("/companies", getCompany);
router.put("/companies", updateCompany);
router.delete("/companies", deleteCompany);

module.exports = router;
