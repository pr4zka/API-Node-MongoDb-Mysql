const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
} = require("../controllers/tracks");
const {
  validatorCreateItem,
  validatoGetItem,
} = require("../validators/tracks");
const checkRole = require("../middleware/role");

/**
 * Listar los items
 */
router.get("/", authMiddleware, getItems);

/**
 * Obtener un detalle de item
 */
router.get("/:id", authMiddleware, validatoGetItem, getItem);

/**
 * Crear los items
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateItem,
  createItems
);

/**
 * Actualizar los items
 */
router.put(
  "/:id",
  authMiddleware,
  validatoGetItem,
  validatorCreateItem,
  updateItems
);

/**
 * Actualizar los items
 */
router.delete("/:id", validatoGetItem, validatorCreateItem, deleteItems);

module.exports = router;
