const { encrypt, compare } = require("../utils/handlePassword");
const { matchedData } = require("express-validator");
const { tokenSign, verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

//este controlador se encarga de registar un usuario
const RegisterCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

//este controlador se encarga de iniciar la sesion del usuario
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role email");
    if (!user) {
      handleHttpError(res, "USER_NOT_EXIST", 404);
      return;
    }
    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }
    user.set('password', undefined, {strict: false})
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = {
  RegisterCtrl,
  loginCtrl,
};
