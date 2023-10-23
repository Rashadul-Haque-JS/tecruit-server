const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Applicant = require('../../models/applicants');

const applicantSignup = async (req, res) => {
  try {
    const { email, password, type } = req.body;

    const existingApplicant = await Applicant.findOne({ email });
    if (existingApplicant) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const newApplicant = new Applicant({
      email,
      password: bcrypt.hashSync(password, Number(process.env.HASH_SALT)),
      type,
    });

    await newApplicant.save();

    // Create a JWT token for the newly registered applicant
    const token = jwt.sign({ email: newApplicant.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ message: 'Signup successful', token, type });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getApplicant = (req, res) => {
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
  
      // Fetch the applicant's information
      const applicant = await Applicant.findOne({ email });
  
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found' });
      }
  
      const authApplicant = {
        email: applicant.email,
        id: applicant.id,
        type: applicant.type,
      };
  
      return res.status(200).json(authApplicant);
    });
  };
  const updateApplicant = (req, res) => {
    const token = req.headers.authorization;
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const email = decoded.email;
  
      try {
        const applicant = await Applicant.findOne({ email });
  
        if (!applicant) {
          return res.status(404).json({ message: 'Applicant not found' });
        }
  
        if (req.body.name) {
          applicant.name = req.body.name;
        }
  
        if (req.body.age) {
          applicant.age = req.body.age;
        }
  
        await applicant.save();
  
        return res.status(200).json(applicant);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  };
  const deleteApplicant = (req, res) => {
    const token = req.headers.authorization;
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const email = decoded.email;
  
      try {
        const applicant = await Applicant.findOne({ email });
  
        if (!applicant) {
          return res.status(404).json({ message: 'Applicant not found' });
        }
  
        await applicant.remove();
  
        return res.status(204).json();
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  };

module.exports = {
    applicantSignup,
    getApplicant,
    updateApplicant,
    deleteApplicant 
};