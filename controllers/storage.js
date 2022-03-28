const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const fs = require("fs");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener la lista de la base de datos
 * @param {} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  try {
    const { id } = matchedData(req);
    //le paso el _id del storage para que me devuelva el pedido de la coleccion
    const data = await storageModel.findById({ _id: id });

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERRORR_DETALLE_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERRORR_LIST_ITEMS");
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItems = async (req, res) => {
  const { body, file } = req;
  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`,
  };
  const data = await storageModel.create(fileData);
  res.send({ file });
};

/**
 * Actualizar un registro
 * @param {*} req
 * @param {*} res
 */

/**
 * Borrar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.findByIdAndDelete({_id: id});
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`; //la ruta de los archivos
    fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERRORR_DELETED_ITEMS");
  }
};

module.exports = {
  getItems,
  getItem,
  createItems,
  deleteItems,
};
