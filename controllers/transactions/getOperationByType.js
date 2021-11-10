const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getOperationByType = async (req, res) => {
  const data = await getAllTransactions(req);

  const { operationType } = req.params;

  const result = data.filter((item) => item.operation === operationType);
  sendSuccessRes(res, { result }, 200);
};

module.exports = getOperationByType;
