const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getCategoriesByMonth = async (req, res) => {
  const { year, month, operationType } = req.params;

  const { _id } = req.user;

  const data = await getAllTransactions({
    owner: _id,
    month,
    year,
    operation: operationType,
  });
  console.log("data>>>", data);

  let result = Object.values(
    data.reduce((prev, next) => {
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
  console.log("result>>>", result);

  sendSuccessRes(res, result, 200);
};

module.exports = getCategoriesByMonth;
