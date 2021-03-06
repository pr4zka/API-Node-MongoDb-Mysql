const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Storage = sequelize.define(
  "storage", 
  {
    url: {
      type: DataTypes.STRING,
    },
    filename: {
      type: DataTypes.NUMBER,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Storage;
