const Sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const {
  login,
  register,
  getPersonalInfo: getPersonalInfoService,
  deleteUser,
  getUserList,
  updateUser,
} = require("../services/userServices");
const { request, response } = require("express");

const user = {};

const authenticateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const response = await login(email, password);
    return res.json(response);
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    await deleteUser(id);

    return res.json({ OK: true, message: `User successfully deleted!` });
  } catch (error) {
    next(error);
  }
};

const userRegistration = async (req, res, next) => {
  let { email, password, firstName, lastName } = req.body;

  try {
    const response = await register(email, password, firstName, lastName);
    return res.json(response);
  } catch (err) {
    next(err);
  }
};

//funtion to find all users
const allUserList = async (req, res) => {
  //Create a variable to save the result of the request
  const listUser = await getUserList().catch((err) => {
    res.status(500).json({
      message: "Error with data base",
      error: err,
    });
  });

  //Return message succesfuly
  res.status(200).json({
    message: "User list found succesfuly",
    listUser,
  });
};

const getPersonalInfo = async (req = request, res = response) => {
  let code = 200;
  let resContent = { OK: true, data: {} };

  try {
    resContent = {
      ...resContent,
      data: {
        ...(await getPersonalInfoService(req.user.id)).dataValues,
      },
    };
  } catch (error) {
    resContent = {
      OK: false,
      data: {
        msg: error.msg,
        status: error.status,
      },
    };
  }

  res.status(code).json(resContent);
};

const userUpdate = async (req = request, res = response) => {
  let code = 200;
  let resContent = { OK: true, data: {} };

  try {
    const user = await updateUser(req);
    if (!user) {
      resContent = {
        OK: false,
        data: {
          msg: "The user trying to update does not exist",
        },
      };
    } else {
      resContent = {
        ...resContent,
        data: {
          user,
        },
      };
    }
  } catch (e) {
    resContent = {
      OK: false,
      data: {
        msg: e.msg,
        status: e.status,
      },
    };
  }
  res.status(code).json({ resContent });
};

module.exports = {
  authenticateLogin,
  userRegistration,
  getPersonalInfo,
  deleteUserById,
  allUserList,
  userUpdate,
};
