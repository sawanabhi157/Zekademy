import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, trim: true },
  first_name: { type: String, require: true, trim: true },
  last_name: { type: String, require: true, trim: true },
  password: { type: String, require: true },
  age: { type: Number, require: true },
  city: { type: String, require: true, trim: true },
});

// Model
const UserMondel = mongoose.model("user", userSchema);

export default UserMondel;
