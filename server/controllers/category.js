const {
  createCategory,
  deleteCategoryById,
  updateCategoyById,
  categoryById,
} = require("../services/categoryService.js");
const { getAllCategories } = require("../services/categoryService.js");

const create = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await createCategory(name, description);

    return res.json({
      OK: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: `Can't create new category: ${error}` });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const response = await categoryById(id);

  if (!response) {
    return res.status(404).send({ message: "Insert a valid Id" });
  }

  return res.json({
    OK: true,
    data: response,
  });
};

const getCategory = async (req, res) => {
  const category = await getAllCategories();

  return res.json({
    OK: true,
    data: category,
  });
};

//Operation to execute delete
const deleteCategory = async (req, res) => {
  //get id of category
  const idCategory = req.params.id;

  //execute delete
  const deleteCat = await deleteCategoryById(idCategory).catch((err) => {
    res.status(500).json({
      message: "Error with DataBase",
      error: err,
    });
  });

  //response if action delete was succesfully
  res.status(200).json({
    OK: true,
    message: "Record delete succesfully",
    id: idCategory,
  });
};

//Operation to update category record
const updateCategory = async (req, res) => {
  //get id and data of body and parameters
  const idCategory = req.params.id;
  const bodyUpdated = {
    name: req.body.name,
    description: req.body.description,
  };

  //create const to update and return
  const recordUpdated = await updateCategoyById(bodyUpdated, idCategory).catch(
    (err) => {
      res.status(500).json({
        message: "Error with DataBase",
        error: err,
      });
    }
  );

  //response if action update was succesfully
  res.status(200).json({
    OK: true,
    message: "Record update succesfully",
    recordUpdated,
  });
};

module.exports = {
  create,
  deleteCategory,
  getCategory,
  updateCategory,
  getCategoryById,
};
