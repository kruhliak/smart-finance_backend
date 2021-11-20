const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getOperationByMonth = async (req, res) => {
  const { year, month } = req.params;
  const { _id } = req.user;

  const data = await getAllTransactions({ owner: _id, month, year });

  let result = Object.values(
    data.reduce((prev, next) => {
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
