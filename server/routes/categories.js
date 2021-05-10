var express = require("express");
var router = express.Router();
const {
  crateCategory,
  deleteCategoryById,
  updateCategoryById,
} = require("../middlewares/categories");
const {
  create,
  deleteCategory,
  updateCategory,
  getCategory,
  getCategoryById,
} = require("../controllers/category.js");

/* POST to create categories */
router.post("/", create);

router.get("/:id", getCategoryById);

//Route to delete category
router.delete("/:id", deleteCategoryById, deleteCategory);
//Route to update category
router.put("/:id", updateCategoryById, updateCategory);

router.get("/", getCategory);

module.exports = router;
