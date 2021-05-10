var express = require("express");
var router = express.Router();

// validation middlewares
const {
  loginRequestValidation,
  registerRequestValidation,
  getAllUsersRequestValidation,
  getPersonalInfoRequestValidation,
  updateUserInfoRequestValidation,
  deleteUserRequestValidation,
} = require("../middlewares/users");

const {
  authenticateLogin,
  userRegistration,
  getPersonalInfo,
  deleteUserById,
  allUserList,
  userUpdate,
} = require("../controllers/user");

/* GET users listing. */
router.get("/", getAllUsersRequestValidation, allUserList);

router.post("/auth/login", loginRequestValidation, authenticateLogin);

router.delete("/:id", deleteUserRequestValidation, deleteUserById);

router.post("/auth/register", registerRequestValidation, userRegistration);

router.get("/auth/me", getPersonalInfoRequestValidation, getPersonalInfo);

router.put("/:id", updateUserInfoRequestValidation, userUpdate);

module.exports = router;
