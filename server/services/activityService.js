const Sequelize = require("sequelize");
const { NotFound } = require("../error/errors");
const { Activity } = require("../models");

const allActivities = async ()=>{
  return await Activity.findAll()
}

const activityById = async (id)=>{
  return await Activity.findByPk(id);
}

const createActivity = async (name, content, image) => {
  return await Activity.create({
    name,
    content,
    image,
  });
};

const updateActivity = async (id, newActivity) => {
  let activity = await Activity.findOne({ where: { id } });

  if (!activity) throw new NotFound();

  await Activity.update(newActivity, { where: { id } });

  return (await Activity.findOne({ where: { id } })).dataValues;
}

module.exports = {
  allActivities,
  activityById,
  createActivity,
  updateActivity
};
