const jwt = require('jsonwebtoken');

const checkAuthToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tokenParts = authorizationHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = tokenParts[1];

  try {
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err); // Handle the promise rejection
        } else {
          resolve(decoded);
        }
      });
    });
    req.email = decodedToken.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = checkAuthToken;
