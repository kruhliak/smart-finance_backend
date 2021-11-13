const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getOperationByType = async (req, res) => {
  const { operationType, month } = req.params;
  const data = await getAllTransactions(req);

  const typeFilter = data.filter((item) => item.operation === operationType);
  const result = typeFilter.filter((item) => item.month === Number(month));
  sendSuccessRes(res, { result }, 200);
};

module.exports = getOperationByType;
