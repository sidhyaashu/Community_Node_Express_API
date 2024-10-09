import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensures email is always in lowercase
    trim: true, // Removes whitespace
    validate: {
      validator: (v) => /^\S+@\S+\.\S+$/.test(v), // Improved email regex
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
