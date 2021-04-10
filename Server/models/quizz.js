const mongoose = require("mongoose");
const User = require('./user').schema
const Schema = mongoose.Schema;

const QuizzSchema = new Schema({
  title: { type: String, required: true },
  professor: User,
  grade: { type: Number, required: true}
});
module.exports = Quizz = mongoose.model("quizzes", QuizzSchema);