const { verifyToken } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");
const getProperties = require("../utils/handlePropetiesEngine");
const propertiesKey = getProperties();
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_TOKEN", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }
    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id]
    }

    // Depende de la base de datos buscara el _id o id de mysql
    const user = await usersModel.findOne(query);
    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
