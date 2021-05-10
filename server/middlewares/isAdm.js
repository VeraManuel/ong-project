//create object generalMid
//object to add middleware functionalities
const generalMid = {};
const { ADMIN_ROLE } = require("../constants");

generalMid.isAdm = async (req, res, next) => {
  //get usery
  const user = req.user;
  const admin = ADMIN_ROLE;

  if (user.roleId !== admin) {
    res.status(403).json({
      message: "Not have permission of admin",
    });
  } else {
    next();
  }
};
module.exports = generalMid;
