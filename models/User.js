import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  currentBalance: {
    type: Number,
    default: 0,
  },
  transactions: [transactionSchema],
});

const User = mongoose.model("User", userSchema);

export default User;