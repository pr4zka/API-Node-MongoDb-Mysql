const { matchedData, body } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
/**
 * Obtener la lista de la base de datos
 * @param {} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await tracksModel.find({});
    res.send({ data, user });
  
  } catch (error) {
    handleHttpError(res, "ERRORR_GET_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {} req
 * @param {*} res
 */

const createItems = async (req, res) => {
  try {
    //machdata se encarga de recibir los datos correctos
    const body = matchedData(req);

    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERRORR_CREATE_ITEMS");
  }
};

/**
 * Obtener un registo del items
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

/**
 * Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItems = async (req, res) => {
  try {
    //machdata se encarga de recibir los datos correctos
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findByIdAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERRORR_UPDATE_ITEMS");
  }
};

/**
 * Borrar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async (req, res) => {
  try {
    const { id } = req;
    const data = await tracksModel.delete({ _id: id});
    res.send({ data });
  } catch (error) { 
    handleHttpError(res, "ERRORR_DELETE_ITEMS");
  }
};

module.exports = {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
};
