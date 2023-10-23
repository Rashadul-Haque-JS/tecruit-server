const bcrypt = require('bcryptjs');
const Applicant = require('../../models/applicants'); 
const Company = require('../../models/company'); 

const findApplicantOrCompany = async (req, res, next) => {
  const { email, password } = req.body;
  try {
   
    const applicant = await Applicant.findOne({ email });

    if (applicant) {
      if (bcrypt.compareSync(password, applicant.password)) {
        req.applicant = applicant;
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    } else {
     
      const company = await Company.findOne({ email });

      if (company) {
        if (bcrypt.compareSync(password, company.password)) {
          req.company = company;
        } else {
          return res.status(401).json({ message: 'Invalid password' });
        }
      } else {
        return res.status(404).json({ message: 'Email not found' });
      }
    }

    next();
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const handleDuplicateSignup = async (req, res, next) => {
  const { email } = req.body;

  try {
   
    const existingApplicant = await Applicant.findOne({ email });
    const existingCompany = await Company.findOne({ email });

    if (existingApplicant || existingCompany) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    next();
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  findApplicantOrCompany,
  handleDuplicateSignup,
};
