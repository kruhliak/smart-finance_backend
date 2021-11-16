const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getOperationByMonth = async (req, res) => {
  const { year, month } = req.params;
  const data = await getAllTransactions(req);

  const filterMonth = data
    .filter((item) => item.year === Number(year))
    .filter((item) => item.month === Number(month));

  let result = Object.values(
    filterMonth.reduce((prev, next) => {
      if (!prev[next.operation]) {
        prev[next.operation] = {
          operation: next.operation,
          sum: 0,
          list: [],
        };
      }
      prev[next.operation].list.push(next);
      prev[next.operation].sum += next.value;
      return prev;
    }, {})
  );

  sendSuccessRes(res, result, 200);
};

module.exports = getOperationByMonth;
