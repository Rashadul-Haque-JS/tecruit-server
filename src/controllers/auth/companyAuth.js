const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../../models/company");

const companySignup = async (req, res) => {
  try {
    const { password, confirmPassword, ...companyData } = req.body;
    const existingCompany = await Company.findOne({ email: companyData.email });

    if (existingCompany) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    companyData.password = bcrypt.hashSync(
      password,
      Number(process.env.HASH_SALT)
    );

    const newCompany = new Company(companyData);
    await newCompany.save();

    const token = jwt.sign(
      { email: companyData.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(201)
      .json({ message: "Signup successful", token, type: companyData.type });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCompany = async (req, res) => {
  const email = req.email;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const { password, ...companyData } = company.toObject();
    
    return res.status(200).json(companyData);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCompany = async (req, res) => {
    const email = req.email;
    try {
        const company = await Company.findOne({ email });
  
        if (!company) {
          return res.status(404).json({ message: "Company not found" });
        }
  
        await company.updateOne(req.body);
        await company.save();
  
        return res.status(200).json(company);
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
};



const deleteCompany = async (req, res) => {
    const email = req.email;
    try {
      const result = await Company.deleteOne({ email });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
  companySignup,
  getCompany,
  updateCompany,
  deleteCompany,
 
};
