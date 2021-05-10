const express = require("express");
const router = express.Router();
const {
  createNewMember,
  updateMemberById,
  deleteMemberById,
} = require("../middlewares/members");
const {
  membersList,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/members");

/* GET members listing. */
router.get("/", membersList);

/*POST create member*/
router.post("/", createNewMember, createMember);

/*PUT updateMember */
router.put("/:id", updateMemberById, updateMember);

/*DELETE member */
router.delete("/:id", deleteMemberById, deleteMember);

module.exports = router;
