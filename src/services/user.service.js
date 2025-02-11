import User from '../models/user.model';

// Existing newUser function...
export const newUser = async (body) => {
  const { email, phonenumber } = body;

  if (!email || !phonenumber) {
    return { error: 'Email and phone number are required' };
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return { error: 'Email already exists' };
  }

  try {
    const user = await User.create(body);
    return user;
  } catch (error) {
    return { error: error.message };
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
