const jwt = require('jsonwebtoken');
const checkToken = role => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(' ')[1];
      const isValid = jwt.verify(token, process.env.DOCTORKEY);
      console.log(isValid);
      //roles check
      if (!role.includes(isValid.role)) {
        res.status(403).json({ message: 'You are not authorized' });
      }
      next();
    } catch (e) {
      res.status(403).json({ message: 'You are not authorized' });
    }
  };
};

module.exports = checkToken;
