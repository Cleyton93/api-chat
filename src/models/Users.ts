import mongoose, { Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'profile-default.png',
    },
  },
  { timestamps: true },
);

interface IUserSchema extends Document {
  _id: string;
  name: string;
  email: string;
  pass: string;
  avatar: string;
  setPass: (pass: string) => void;
  passValidator: (pass: string) => boolean;
  sendAuthJSON: () => {
    name: string;
    email: string;
    token: string;
    avatar: string;
  };
}

UsersSchema.methods.setPass = function (pass: string) {
  this.pass = crypto.createHash('md5').update(pass).digest('hex');
};

UsersSchema.methods.passValidator = function (pass: string) {
  if (this.pass === crypto.createHash('md5').update(pass).digest('hex')) {
    return true;
  }

  return false;
};

UsersSchema.methods.generateToken = function () {
  const exp = new Date();
  exp.setDate(exp.getDate() + 15);

  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      exp: exp.getTime() / 1000,
    },
    secret,
  );
};

UsersSchema.methods.sendAuthJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    token: this.generateToken(),
  };
};

UsersSchema.plugin(mongooseUniqueValidator, { message: 'Já existe' });

export default mongoose.model<IUserSchema>('Users', UsersSchema);
