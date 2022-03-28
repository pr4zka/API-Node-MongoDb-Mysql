const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, //TODO createdAt, updatedAt
    versionKey: false,
  }
);

// 'users' sera el nombre de la tabla de mongoose
UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserSchema);
