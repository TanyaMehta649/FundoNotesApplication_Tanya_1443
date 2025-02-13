import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




/**
 * Register a new user
 */
export const newUser = async (body) => {
  const { email, password } = body;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return { error: 'Email already exists' };
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    body.password = hashedPassword;

    // Create user
    const user = await User.create(body);
    return user;
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Login User
 */
export const loginUser = async (body) => {
  const { email, password } = body;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: 'Invalid credentials' };
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userid: user._id, email: user.email },
      process.env.JWT_SECRET,
    );

    return { message: 'Login successful', token, user };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Get all users
 */
export const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return { error: error.message };
  }
};
let resetOTP;
export const forgetPass = async ({email}) => {
  try{
    const user = await User.findOne({email});
    if(!user){
      return {message: 'not found email'};
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    resetOTP=otp;
    return{message:'otp generated' , otp};
  }catch (error) {
    return {error: error.message};
  }
}
export const resetPass =async({email,otp,newPassword})=>{
  try{
    const user=await User.findOne({email});
    if(!user){
      return {message: 'not found email'};
    }
    if(resetOTP!=parseInt(otp)){
      return {message:'invalid or expired otp'};
    }
    const hashedPassword=await bcrypt.hash(newPassword,10);
    let data=await User.findOneAndUpdate(
      {email},
      {password:hashedPassword},
      {new:true}
    );
    resetOTP=null;
    return data;
  }
  catch(error){
    return {error:error.message};
  }
};