const { Router } = require("express");
const { validatoGetItem } = require("../validators/storage.js");
const {
  createItems,
  getItem,
  getItems,
  deleteItems,
} = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const router = Router();
//TODO http://localhost:3001/storage

router.get("/", getItem);
router.get("/:id", validatoGetItem, getItems);
router.delete("/:id", validatoGetItem, deleteItems);
router.post("/", uploadMiddleware.single("myfile"), createItems);

module.exports = router;
