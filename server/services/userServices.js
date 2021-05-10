const bcrypt = require("bcryptjs");
const { createToken } = require("./jwtService");
const { User } = require("../models");
const { send } = require("./email");
const { NotFound, Unauthorized } = require("../error/errors");

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Unauthorized(
        "Authentication failed! Email / Password not found!"
      );
    }

    const validPassword = await bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw new Unauthorized(
        "Authentication failed! Email / Password not found!"
      );
    }

    const token = createToken(user);

    return {
      OK: true,
      token,
      userId:user.id,
      user: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      isAdmin: user.isAdmin,
    };
  } catch (error) {
    throw error;
  }
};

const register = async (email, password, firstName, lastName) => {
  return await User.findAll({
    where: { email: email },
  }).then(async (user) => {
    if (user.length > 0) {
      return { OK: false, error: "El usuario ya a sido registrado" };
    } else {
      password = await bcrypt.hash(password, 10);

      user = await User.create({
        email,
        password,
        firstName,
        lastName,
        roleId: 2,
      });

      // ONG should insert subject and text or html template
      send({
        to: user.email,
        subject: "Welcome to ONG", // subject to change
        text: `Thank for signup to ONG ${user.firstName}`, // can change this for the template below
        // html: "<strong> WELCOME </strong>", you can create a template and insert it here
      });
      let token = createToken(user);
      return {
        OK: true,
        token,
        userId:user.id,
        user: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        isAdmin: user.isAdmin,
      };
    }
  });
};

const getPersonalInfo = async (id) => {
  return await User.findOne({
    where: { id },
    attributes: {
      exclude: "password createdAt updatedAt deletedAt",
    },
  });
};

const deleteUser = async (id) => {
  try {
    let user = await User.findByPk(id);

    user.destroy();
  } catch (error) {
    throw new NotFound("User not found!");
  }
};

//funtion to find all users
const getUserList = async () => {
  //Create a variable to save the result of the request
  const listUsers = await User.findAll();

  //return array object
  return listUsers;
};

const updateUser = async (req) => {
  const idUpd = req.params;
  const userUpd = req.body;

  const user = await User.findOne({
    where: { ...idUpd },
    fields: ["firstName", "lastName", "roleId"],
  });
  if (!user) {
    return null;
  }
  await user.update({ ...userUpd });
  return { ...idUpd, ...userUpd };
};

const findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  login,
  register,
  deleteUser,
  getPersonalInfo,
  getUserList,
  updateUser,
  findByEmail,
};
