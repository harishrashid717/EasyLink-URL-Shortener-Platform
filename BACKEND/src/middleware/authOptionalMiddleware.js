import { verifyToken } from '../utils/jwtToken.js';
import { cookieOption } from '../config/cookieOption.js';

const authOptionalMiddleware = (req, res, next) => {
  const authToken = req.cookies.authToken;

  if (!authToken) return next();

  try {
    const decodedUser = verifyToken(authToken, process.env.JWT_SECRET);
    req.user = decodedUser;
    console.log('decodedUser -', decodedUser);
    console.log('req.user -', req.user);
  } catch (error) {
    res.clearCookie('authToken', cookieOption);
  }

  return next();
};

export default authOptionalMiddleware;
