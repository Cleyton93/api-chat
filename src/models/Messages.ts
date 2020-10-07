import mongoose from 'mongoose';

const MessagesSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Messages', MessagesSchema);
