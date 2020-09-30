import mongoose from 'mongoose';

const MessagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
}, { timestamps: true });

export default mongoose.model('Messages', MessagesSchema);
