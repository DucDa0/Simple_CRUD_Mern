const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.auth = function (req, res, next) {
  const token = req.header('x-access-token');

  if (!token) {
    return res.status(401).json({
      errors: [{ msg: 'Invalid Token!' }],
    });
  }
  try {
    const decoded = jwt.verify(token, config.get('JWT_LOGIN'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Expired Token!' }] });
  }
};
