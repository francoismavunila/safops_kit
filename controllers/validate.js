const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the request headers, query string, or cookies
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, 'your_secret_key', (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token is valid, extract the user ID from the decoded token
    const userId = decodedToken.user_id;
    req.userId = userId

    // Perform additional authentication logic if needed
    // ...

    // Authentication successful, attach the user ID to the request object for future use
    req.userId = userId;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;