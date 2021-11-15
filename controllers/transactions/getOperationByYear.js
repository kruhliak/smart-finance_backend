const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getOperationByYear = async (req, res) => {
  const { operationType, year } = req.params;
  const data = await getAllTransactions(req);

  const filterYear = data
    .filter((item) => item.operation === operationType)
    .filter((item) => item.year === Number(year));

  // const sum = filterYear.reduce((previousValue, item) => {
  //   return previousValue + item.value;
  // }, 0);

  sendSuccessRes(res, { items: filterYear }, 200);
};

module.exports = getOperationByYear;
