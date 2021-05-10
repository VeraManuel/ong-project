const { Members } = require("../models");

const list = async () => {
  return await Members.findAll();
};

const create = async (name, image) => {
  return await Members.create({
    name: name,
    image: image,
  });
};

const update = async (id, name, image) => {
  await Members.findOne({
    where: { id: id },
  })
    .then((member) => {
      if (member) {
        member.name = name;
        member.image = image;

        member.save();
      }
    })
    .catch((err) => {
      return { OK: false, error: err };
    });

  return Members.findOne({
    where: { id: id },
  });
};

const eliminate = async (id) => {
  return await Members.findOne({
    where: { id },
  })
    .then((member) => {
      member.destroy();
      return { OK: true, msg: "Deleted" };
    })
    .catch((err) => {
      return { OK: false, error: err };
    });
};

module.exports = {
  list,
  create,
  update,
  eliminate,
};
