const addTransaction = require("./addTransaction");
const getOperationByType = require("./getOperationByType");
const removeById = require("./removeById");
const getOperationByYear = require("./getOperationByYear");
const getOperationByMonth = require("./getOperationByMonth");

module.exports = {
  addTransaction,
  getOperationByType,
  removeById,
  getOperationByYear,
  getOperationByMonth,
};
