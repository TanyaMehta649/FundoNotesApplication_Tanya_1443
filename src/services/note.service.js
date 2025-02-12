import Note from '../models/note.models';
import HttpStatus from 'http-status-codes';
export const createNote=async(body)=>{
    const data=await Note.create(body);
    // Creates a new note in the MongoDB database using the provided body.
    return{
        //response to be returned
        code:HttpStatus.CREATED,
        data:data,
        message:"Note created successfully"
    };
}
export const updateNote = async (_id, body) => {
    try{
        const note = await Note.findById(_id);
        if (!note) {
            return { message: 'Note not found' };
        }
        if(note.isTrash === true){
            return {message: 'no notes'};
        }
        console.log("updated user");
        const data = await Note.findByIdAndUpdate(_id,body,{new: true});
        return data;
    } catch (error) {
        return {error: error.message};
    }
};
export const deleteNotes = async (_id) => {
    try {
      const note = await Note.findById(_id);
  
      // Use ternary operator to toggle isTrash field
      const data = await Note.findByIdAndUpdate(
        _id,
        { isTrash: note.isTrash ? false : true }, // Toggle the isTrash value
        { new: true }
      );
  
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };