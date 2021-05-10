const { request, response } = require("express");
const {
  getNews,
  newsById,
  createNew: createNewService,
  updateNew,
  deleteNew,
} = require("../services/newsService.js");

const createNew = async (req = request, res = response) => {
  let code = 201;
  let resContent = { OK: true };

  try {
    resContent = {
      ...resContent,
      data: await createNewService(req.body),
    };
  } catch (error) {
    code = error.status || 500;
    resContent = {
      OK: false,
      errors: {
        msg:
          error.msg ||
          "An error has occurred. Please talk to the administrator",
      },
    };
  }

  res.status(code).json(resContent);
};

const getAllNews = async (req, res) => {
  const response = await getNews();

  try {
    if (!response.length) {
      return res.json({ message: "There are no news!!" });
    }

    return res.json({
      OK: true,
      data: response,
    });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

const getNewsById = async (req, res) => {
  const { id } = req.params;
  const response = await newsById(id);

  if (!response) {
    return res.status(404).send({ message: "Insert a valid Id" });
  }

  return res.json({
    OK: true,
    data: response,
  });
};

const updateNewById = async (req, res) => {
  const { id } = req.params;
  const { name, content, image, type, categoryId } = req.body;

  try {
    const response = await updateNew(
      id,
      name,
      content,
      image,
      type,
      categoryId
    );

    return res.send({
      OK: true,
      data: response,
    });
  } catch (error) {
    return res.status(404).send({ message: "New entry not found" });
  }
};
const deleteNewById = async (req, res, next) => {
  const id = req.params.id;

  try {
    await deleteNew(id);
    return res.json({
      OK: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNew,
  updateNewById,
  deleteNewById,
};
