const mongoose = require("mongoose");
const user = require('./user').schema
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [user]
});
module.exports = Group = mongoose.model("groups", GroupSchema);