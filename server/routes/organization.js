const { Router } = require("express");
const {
  createOrganization,
  publicOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../middlewares/organizations");
const organization_controller = require("../controllers/organization-controller");

const router = Router();

router.post("/", createOrganization, organization_controller.create);

router.get(
  "/:id/public",
  publicOrganization,
  organization_controller.getPublic
);
router.put("/:id", updateOrganization, organization_controller.update);

router.delete(
  "/:id",
  deleteOrganization,
  organization_controller.deleteOrgById
);

module.exports = router;
