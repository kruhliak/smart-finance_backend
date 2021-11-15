const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getOperationByMonth = async (req, res) => {
  const { operationType, year, month } = req.params;
  const data = await getAllTransactions(req);

  const filterMonth = data
    .filter((item) => item.operation === operationType)
    .filter((item) => item.year === Number(year))
    .filter((item) => item.month === Number(month));

  sendSuccessRes(res, { items: filterMonth }, 200);
};

module.exports = getOperationByMonth;
