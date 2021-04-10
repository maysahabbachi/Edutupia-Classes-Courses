const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
  resetPasswordToken: {type : String,default:null},
  role: { type: String, default: 'student', enum: ["student", "professor", "admin"] } 
});
module.exports = User = mongoose.model("users", UserSchema);