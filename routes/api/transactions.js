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
  "/:year/:month",
  authenticate,
  controllerWrapper(ctrl.getAllOperationByMonth)
);
router.get("/:year", authenticate, controllerWrapper(ctrl.getSummaryByYear));

router.get(
  "/:operationType/:year/:month",
  authenticate,
  controllerWrapper(ctrl.getCategoriesByMonth)
);

module.exports = router;
