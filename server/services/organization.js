const { Organization } = require("../models");
const { NotFound } = require("../error/errors");

const create = async (organization) => {
  let organizationDB = await Organization.create(organization);
  return organizationDB.dataValues;
};

const getOrganization = async (id) => {
  let organizationDB = await Organization.findOne({ where: { id } });
  if (!organizationDB) throw new NotFound();

  return organizationDB.dataValues;
};

const update = async (organization, id) => {
  let organizationDB = await Organization.findOne({ where: { id } });
  if (!organizationDB) throw new NotFound();

  await Organization.update(organization, { where: { id } });

  organizationDB = await Organization.findOne({ where: { id } });

  return organizationDB.dataValues;
};

const deleteOrg = async (id) => {
  await Organization.destroy({
    where: { id },
  });
};

module.exports = { create, getOrganization, update, deleteOrg };
