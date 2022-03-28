const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const tracksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// 'users' sera el nombre de la tabla de mongoose
tracksSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", tracksSchema);
