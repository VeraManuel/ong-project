const { request, response } = require("express");
const organization_service = require("../services/organization");

const getPublic = async (req = request, res = response, next) => {
  try {
    let {
      name,
      image,
      address,
      welcomeText,
      phone,
      facebook,
      linkedin,
      instagram,
      createdAt,
      updatedAt,
    } = await organization_service.getOrganization(req.params.id);

    let response = {
      name,
      image,
      address,
      welcomeText,
      phone,
      social_media: {
        facebook,
        linkedin,
        instagram,
      },
      createdAt,
      updatedAt,
    };

    res.status(200).json({ OK: true, data: response });
  } catch (error) {
    next(error);
  }
};

const create = async (req = request, res = response, next) => {
  const {
    name,
    image,
    address,
    welcomeText,
    phone,
    facebook,
    linkedin,
    instagram,
  } = req.body;
  try {
    let data = await organization_service.create({
      name,
      image,
      address,
      welcomeText,
      phone,
      social_media: {
        facebook,
        linkedin,
        instagram,
      },
    });

    res.status(201).json({ OK: true, data });
  } catch (error) {
    next(error);
  }
};

const update = async (req = request, res = response, next) => {
  const {
    name,
    image,
    address,
    welcomeText,
    phone,
    facebook,
    linkedin,
    instagram,
  } = req.body;
  try {
    let data = await organization_service.update(
      {
        name,
        image,
        address,
        welcomeText,
        phone,
        social_media: {
          facebook,
          linkedin,
          instagram,
        },
      },
      req.params.id
    );

    res.status(200).json({ OK: true, data });
  } catch (error) {
    next(error);
  }
};

const deleteOrgById = async (req, res) => {
  const id = req.params.id;
  await organization_service.deleteOrg(id);
  return res.json({ message: "Successfully deleted" });
};

module.exports = { getPublic, create, update, deleteOrgById };
