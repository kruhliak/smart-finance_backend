const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getCategoriesByMonth = async (req, res) => {
  const { year, month, operationType } = req.params;
  const data = await getAllTransactions(req);

  const filter = data
    .filter((item) => item.year === Number(year))
    .filter((item) => item.month === Number(month))
    .filter((item) => item.operation === operationType);

  let result = Object.values(
    filter.reduce((prev, next) => {
      if (!prev[next.category]) {
        prev[next.category] = {
          category: next.category,
          sum: 0,
          list: [],
        };
      }
      prev[next.category].list.push(next);
      prev[next.category].sum += next.value;
      return prev;
    }, {})
  );

  sendSuccessRes(res, result, 200);
};

module.exports = getCategoriesByMonth;
