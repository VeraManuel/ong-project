const { request, response } = require("express");
const testimony_service = require("../services/testimony");

const listAll = async (req, res) => {
  const response = await testimony_service.allTestimonials();

  res.json(response);
};

const create = async (req = request, res = response, next) => {
  const { name, content, image } = req.body;

  try {
    let data = await testimony_service.create({ name, content, image });

    res.status(201).json({
      OK: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req = request, res = response, next) => {
  const { name, content, image } = req.body;

  try {
    let data = await testimony_service.update(
      { name, content, image },
      req.params.id
    );

    res.status(201).json({
      OK: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getTestimoniesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await testimony_service.testimoniesById(id);

    return res.json({
      OK: true,
      data: response,
    });
  } catch (err) {
    next();
  }
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await testimony_service.deleteById(id);

    return res.json({ OK: true, message: `Testimony successfully deleted!` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  deleteById,
  listAll,
  getTestimoniesById,
};
