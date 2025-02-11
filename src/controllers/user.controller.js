import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const registerUser = async (req, res) => {
  try {
    let data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'New user Created'
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error creating user'
    });
  }
};
export const loginUser=async(req,res)=>{
  try{
    let data=await UserService.login(req.body);
    if(data.error){
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code:HttpStatus.UNAUTHORIZED,
        message:data.error
      });
    }
    res.status(HttpStatus.OK).json({
      code:HttpStatus.OK,
      data:data,
      message:'Login successful'
    });
  }
  catch(error){
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code:HttpStatus.INTERNAL_SERVER_ERROR,
      message:'Error Logging in'
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    let data = await UserService.getUsers(); 
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Users fetched successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error fetching users'
    });
  }
};
