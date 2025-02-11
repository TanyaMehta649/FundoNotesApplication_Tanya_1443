import { optional } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,

    },
    phonenumber:{
      type:Number,
      required:true,
      unique:true,

    },
    password:{
      type:String,
      required:true,
      unique:true,
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
