const { NotFound } = require("../error/errors");
const { Testimony } = require("../models");

const allTestimonials = async () => {
  return await Testimony.findAll();
};

const create = async (testimony) => {
  let testimonyDB = (await Testimony.create(testimony)).dataValues;

  return testimonyDB;
};

const update = async (testimony, id) => {
  let testimonyDB = await Testimony.findOne({ where: { id } });
  if (!testimonyDB) throw new NotFound();

  await Testimony.update(testimony, { where: { id } });

  testimonyDB = (await Testimony.findOne({ where: { id } })).dataValues;

  return testimonyDB;
};

const testimoniesById = async (id) => {
  return await Testimony.findOne({
    where: { id },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      new NotFound("Testimony not found!");
    });
};

const deleteById = async (id) => {
  try {
    let testimony = await Testimony.findByPk(id);

    testimony.destroy();
  } catch (error) {
    throw new NotFound("Testimony not found!");
  }
};

module.exports = {
  create,
  update,
  deleteById,
  allTestimonials,
  testimoniesById,
};
