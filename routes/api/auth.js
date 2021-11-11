const express = require("express");

const { joiSchema } = require("../../models/user");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middleware");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.currentUser));

router.post("/balance", authenticate, controllerWrapper(ctrl.addBalance));

router.get("/google", controllerWrapper(ctrl.googleAuth));

router.get("/google-redirect", controllerWrapper(ctrl.googleRedirect));

module.exports = router;
