const express = require("express");

const { joiSchema } = require("../../models/transactions");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middleware");
const { transactions: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/add",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.addTransaction)
);

router.delete(
  "/:operationId",
  authenticate,
  controllerWrapper(ctrl.removeById)
);

router.get(
  "/:operationType",
  authenticate,
  controllerWrapper(ctrl.getOperationByType)
);

module.exports = router;
