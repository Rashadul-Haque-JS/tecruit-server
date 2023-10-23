const jwt = require('jsonwebtoken');
const Applicant = require('../../models/applicants');
const Company = require('../../models/company'); 

const login = async (req, res) => {
  try {
    let token;
    let type;
    
    if (req.applicant) {
      const applicant = await Applicant.findOne({ email: req.applicant.email });
      if (applicant) {
        token = jwt.sign({ email: applicant.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        type = 'applicant'; 
      }
    } else if (req.company) {
      const company = await Company.findOne({ email: req.company.email });
      if (company) {
        token = jwt.sign({ email: company.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        type = 'company'; 
      }
    }

    if (!token) {
      return res.status(401).json({ message: 'Invalid user or password' });
    }

    return res.status(200).json({ message: 'Login successful', token, type });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login
};
