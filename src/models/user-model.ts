import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minlength: 6,
    maxlength: 100,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 100,
    default: "Last Name",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100,
    default: "City Name",
  },
});

// HASHED PASSWORD BEFORE SUBMITTING
UserSchema.pre("save", async function (): Promise<any> {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// CREATION OF TOKEN HERE
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
// COMPARE PASSWORD
UserSchema.methods.comparePassword = async function (candidatePassword: any) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
const User = mongoose.model("User", UserSchema);
export default User;
