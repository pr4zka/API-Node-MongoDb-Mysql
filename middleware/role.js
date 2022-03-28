const { handleHttpError } = require("../utils/handleError");
/**
 * Array con los roles permitidos
 * @param {*} req rol
 * @param {*} res
 * @param {*} next
 */
const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolesByUser = user.role; //almaceno el rol del usuario
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = checkRole;
