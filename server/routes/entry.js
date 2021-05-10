var express = require("express");
const {
  createNewEntry,
  updateNew,
  deleteNew,
} = require("../middlewares/entries");
var router = express.Router();
const {
  getAllNews,
  getNewsById,
  updateNewById,
  deleteNewById,
  createNew,
} = require("../controllers/news.js");

router.post("/", createNewEntry, createNew);

/* GET listado de novedades */
router.get("/", getAllNews);

/* GET listado de novedades pasando un id por parametro */
router.get("/:id", getNewsById);

/* PUT actualizacion de novedades segun id */
router.put("/:id", updateNew, updateNewById);

/* DELETE novedad segun id */
router.delete("/:id", deleteNew, deleteNewById);

module.exports = router;
