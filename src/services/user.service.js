import { error } from 'winston';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

// Existing newUser function...
export const newUser = async (body) => {
  const { email,password} = body;

  if (!email || !password ) {
    return { error: 'Email and password is required' };
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return { error: 'Email already exists' };
  }

  try {
    if(password){
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);
      body.password=hashedPassword;
      const user = await User.create(body);
    return user;
    }
    
  } catch (error) {
    return { error: error.message };
  }
};
export const login=async(body)=>{
  const{email,password}=body;
  if(!email || !password){
    return {error:'email and password is required'};
  }
  try{
    const user=await User.findOne({email});
    if(!user){
      return {error : 'invalid credentials'};
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return {error: 'Invalid credentials'};
    }
    return {message:'login successful',user};
  }
  catch(error){
return {error: error.message};
  }

};
export const getUsers = async () => {
  try {
    // Find all users in the collection
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

