const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getOperationByYear = async (req, res) => {
  const { operationType, year } = req.params;
  const data = await getAllTransactions(req);

  const typeFilter = data.filter((item) => item.operation === operationType);
  const filterYear = typeFilter.filter((item) => item.year === Number(year));

  const month = filterYear.map((item) => {});
  console.log(month);

  const sum = filterYear.reduce((previousValue, item) => {
    return previousValue + item.value;
  }, 0);

  sendSuccessRes(res, { sum, items: filterYear }, 200);
};

module.exports = getOperationByYear;
