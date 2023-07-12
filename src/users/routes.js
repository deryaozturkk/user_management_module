const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.addUsers);
router.get("/:userid", controller.getUsersById);
router.put("/:userid", controller.updateUser);
router.delete("/:userid", controller.removeUser);


module.exports = router;