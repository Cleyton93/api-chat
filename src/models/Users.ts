import mongoose from 'mongoose';
import crypto from 'crypto';

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
}, { timestamps: true });

UsersSchema.methods.passValidator = function (pass: string) {
  if (this.pass === crypto.createHash('md5').update(pass).digest('hex')) {
    return true;
  }

  return false;
};

export default mongoose.model('Users', UsersSchema);
