const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../../models/company');

const companySignup = async (req, res) => {
  try {
    const { password, confirmPassword, ...companyData } = req.body; 
    const existingCompany = await Company.findOne({ email: companyData.email });

    if (existingCompany) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    companyData.password = bcrypt.hashSync(password, Number(process.env.HASH_SALT));

    const newCompany = new Company(companyData);
    await newCompany.save();

   
    const token = jwt.sign({ email: companyData.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(201)
      .json({ message: "Signup successful", token, type: companyData.type });
  } catch (error) {
    console.log('error ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCompany = (req, res) => {
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const tokenParts = authorizationHeader.split(' ');
  
    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
      return res.status(401).json({ message: 'Invalid token format' });
    }
  
    const token = tokenParts[1];
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const email = decoded.email;
  
      try {
        const company = await Company.findOne({ email });
  
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
  
        const authCompany = { email: company.email, id: company.id, type: company.type };
  
        return res.status(200).json(authCompany);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  };
  
  const updateCompany = (req, res) => {
    const token = req.headers.authorization;
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const email = decoded.email;
  
      try {
       
        const company = await Company.findOne({ email });
  
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
  
        if (req.body.name) {
          company.name = req.body.name;
        }
  
        if (req.body.age) {
          company.age = req.body.age;
        }
  
       
        await company.save();
  
        return res.status(200).json(company);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  };
  const deleteCompany = (req, res) => {
    const token = req.headers.authorization;
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const email = decoded.email;
  
      try {
        
        const deletedCompany = await Company.findOneAndDelete({ email });
  
        if (!deletedCompany) {
          return res.status(404).json({ message: 'Company not found' });
        }
  
        return res.status(204).json();
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  };
    
  module.exports = {
    companySignup,
    getCompany,
    updateCompany,
    deleteCompany
  }