const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropetiesEngine");
const propertiesKey = getProperties();

//debe de pasar el objeto del usuario
const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sign;
};

//debe de pasar el token de session
const verifyToken = async (tokenJwT) => {
  try {
    return jwt.verify(tokenJwT, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  tokenSign,
  verifyToken,
};
