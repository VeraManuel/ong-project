const Sequelize = require("sequelize");
const {
  list,
  create,
  update,
  eliminate,
} = require("../services/memberService");

const membersList = async (req, res) => {
  const response = await list();

  return res.json(response);
};

const createMember = async (req, res) => {
  let { name, image } = req.body;

  const response = await create(name, image);

  return res.json(response);
};

const updateMember = async (req, res) => {
  const id = req.params.id;
  const { name, image } = req.body;

  const response = await update(id, name, image);

  return res.json(response);
};

const deleteMember = async (req, res) => {
  const id = req.params.id;

  const response = await eliminate(id);

  return res.json(response);
};

module.exports = {
  membersList,
  createMember,
  updateMember,
  deleteMember,
};
