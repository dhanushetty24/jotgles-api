const jwt = require('jsonwebtoken');


const getTokenFromHeader = (headers) => {
  if (!headers || !headers.authorization) return null;

  const [scheme, token] = headers.authorization.split(' ');

  return scheme === 'Bearer' && token ? token : null;
};

const authMiddleware = (req, res, next) => {
  const token = getTokenFromHeader(req.headers);

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    // bearer token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.authMiddleware = authMiddleware;
