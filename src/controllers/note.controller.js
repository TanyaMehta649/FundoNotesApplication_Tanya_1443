import * as NoteService from '../services/note.service';
import HttpStatus from 'http-status-codes';
export const createNote=async(req,res)=>{
    const data=await NoteService.createNote(req.body);
    res.status(data.code).json({
        code:data.code,
        data:data.data,
        message:data.message
    });
};
export const updateNote = async (req, res, next) => {
    try {
      const data = await NoteService.updateNote(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  export const deleteNotes = async (req,res,next) => {
    try{
    const data = await NoteService.deleteNotes(req.params._id,req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User D_updated successfully'
    });
  } catch (error) {
    next(error);
  }
};