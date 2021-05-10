const { Category } = require("../models");
//import to error handling
const { NotFound } = require("../error/errors");

const createCategory = async (name, description) => {
  return await Category.create({
    name,
    description,
  });
};
const getAllCategories = async () => {
  return await Category.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  });
};

const categoryById = async (id) => {
  return await Category.findOne({
    where: { id },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

//service to delete category by id
const deleteCategoryById = async (id) => {
  try {
    //create const to delete by condition
    const categoryDelete = await Category.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    //resolve error
    throw new NotFound("Category not found, check and enter a correct id");
  }
};

//function to update category record
const updateCategoyById = async (data, id) => {
  try {
    //update record
    const upCategory = await Category.update(data, {
      where: {
        id: id,
      },
    });
    //return object
    return upCategory;
  } catch (error) {
    //resolve error
    throw new NotFound("Record not found, check and enter a correct id");
  }
};
module.exports = {
  categoryById,
  createCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategoyById,
};
