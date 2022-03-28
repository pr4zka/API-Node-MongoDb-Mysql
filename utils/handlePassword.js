const bcryptjs = require("bcryptjs");

//password sin encriptar
const encrypt = async (passwordPlain) => {
  const hash = bcryptjs.hash(passwordPlain, 10);
  return hash;
};
//pasar password sin encriptar y pasar password encriptada
const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
