import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
export const userAuth = async (req, res, next) => {
  try {
    console.log("🔹 Received Authorization Header:", req.header('Authorization'));
    let newToken = req.header('Authorization');
    if (!newToken) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    }
    newToken = newToken.split(' ')[1];
    const user = jwt.verify(newToken, process.env.JWT_SECRET);
    req.user = user;
    req.body.userId = user.userid;
    next();
  } catch (error) {
    console.log("❌ Auth Middleware Error:", error);
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid Token' });
  }
};
