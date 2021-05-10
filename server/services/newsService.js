const { Entry } = require("../models");
const { Category } = require("../models");
const errors = require('../error/errors.js');

const createNew = async (neww) => {
  let category = await Category.findOne({
    where: { id: neww.categoryId },
  });

  if (!category) throw new Error("You must submit an existing category");

  let newNew = await Entry.create({ ...neww, type: "news" });

  return newNew.dataValues;
};

const getNews = async () => {
  return await Entry.findAll({ order: [["createdAt", "DESC"]] })
    .then((data) => {
      return data.map((e) => ({
        id: e.id,
        name: e.name,
        image: e.image,
        createdAt: e.createdAt,
      }));
    })
    .catch((err) => {
      return err;
    });
};

const newsById = async (id) => {
  return await Entry.findOne({
    where: { id },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

const updateNew = async (id, name, content, image, type, categoryId) => {
  const findNew = await Entry.findByPk(id);

  findNew.name = name;
  findNew.content = content;
  findNew.image = image;
  findNew.type = type;
  findNew.categoryId = categoryId;

  return await findNew.save();
};

const deleteNew = async (id) => {
  const newDB = await Entry.findOne({ where: { id } });

  if(!newDB) throw new errors.NotFound(); 

  await Entry.destroy({
    where: {id}
})
};

module.exports = {
  getNews,
  newsById,
  createNew,
  updateNew,
  deleteNew,
};
