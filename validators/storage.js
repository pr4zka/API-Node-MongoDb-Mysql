const { check } = require("express-validator");
const validationResult = require("../utils/handleValidator");

const validatoGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validationResult(req, res, next);
  },
];
module.exports = {
  validatoGetItem,
};
