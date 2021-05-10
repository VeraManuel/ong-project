const { request, response } = require("express");
const {
  allActivities,
  activityById,
  createActivity,
  updateActivity,
} = require("../services/activityService.js");

const listAll = async (req, res)=>{
  const response = await allActivities()

  res.json({
    OK: true,
    data: response
  })
}

const listById = async (req, res) => {
  const id = req.params.id;

  const response = await activityById(id);
  if (response === null) {
    res.status(400).json({ OK: false, error: "Activity not found" });
  } else {
    res.json({
      OK: true,
      data: response,
    });
  }
};

const create = async (req, res) => {
  const { name, content, image } = req.body;

  try {
    const activity = await createActivity(name, content, image);

    return res.status(201).json({
      OK: true,
      data: activity
    });
  } catch (error) {
    return res.status(400).send({ message: "Can't create new Activity!" });
  }
};

const update = async (req = request, res = response, next) => {
  let code = 200;
  let resContent = { OK: true };

  try {
    resContent = {
      ...resContent,
      data: await updateActivity(req.params.id, req.body),
    };
  } catch (error) {
    return next(error);
  }

  res.status(code).json(resContent);
};

module.exports = {
  listAll,
  listById,
  create,
  update,
};
