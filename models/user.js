// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const crypto = require("crypto");

// const UserSchema = new Schema({
//   email: { type: String, unique: true, lowercase: true, default: "admin" },
//   name: { type: String, default: "admin" },
//   hash: String,
//   salt: String,
// });

// UserSchema.methods.setPassword = function (password) {
//   this.salt = crypto.randomBytes(16).toString("hex");
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
//     .toString("hex");
// };

// UserSchema.methods.validPassword = function (password) {
//   var hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
//     .toString("hex");

//   return this.hash === hash;
// };

// const UserModel = mongoose.model("user", UserSchema);

// module.exports = UserModel;
