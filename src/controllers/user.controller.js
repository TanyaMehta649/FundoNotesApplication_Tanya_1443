import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import userModel from '../models/user.model';

export const registerUser = async (req, res) => {
  try {
    let data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'New user Created'
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Error creating user'
    });
  }
};

