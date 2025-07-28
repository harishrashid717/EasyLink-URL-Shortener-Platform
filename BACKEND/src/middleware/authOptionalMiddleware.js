import { verifyToken } from '../utils/jwtToken.js';
import { cookieOption } from '../config/cookieOption.js';

const authOptionalMiddleware = (req, res, next) => {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    req.isAuthenticated = false; 
    return next();
  }
  try {
    const decodedUser = verifyToken(authToken, process.env.JWT_SECRET);
    req.user = decodedUser;
    req.isAuthenticated = true;
  } catch (error) {
    req.isAuthenticated = false;
    res.clearCookie('authToken', cookieOption);
  }

  return next();
};

export default authOptionalMiddleware;
