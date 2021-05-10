const { Router } = require("express");
const {
  createTestimony,
  updateTestimony,
  testimoniesById,
} = require("../middlewares/testimonies");
const testimony_controller = require("../controllers/testimony");

const route = Router();

route.get("/", testimony_controller.listAll);

route.get("/:id", testimoniesById, testimony_controller.getTestimoniesById);

route.post("/", createTestimony, testimony_controller.create);

route.put("/:id", updateTestimony, testimony_controller.update);

route.delete("/:id", testimony_controller.deleteById);

module.exports = route;
