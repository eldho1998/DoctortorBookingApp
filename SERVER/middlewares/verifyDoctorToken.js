const jwt = require('jsonwebtoken');

const verifyDoctorToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.DOCTORKEY);
    req.user = decoded; // Attach the decoded token payload (id, role) to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res
      .status(403)
      .json({ message: 'You are not authorized', error: error.message });
  }
};

module.exports = verifyDoctorToken;
