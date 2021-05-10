var express = require("express");
var router = express.Router();
const { createActivies, updateActivies } = require("../middlewares/activities");
const { listAll,listById, create, update } = require("../controllers/activity.js");

/*GET activities by id */
router.get("/", listAll)

/*GET activities by id */
router.get("/:id", listById);

/* POST to create activities */
router.post("/", createActivies, create);

router.put("/:id", updateActivies, update);

module.exports = router;
