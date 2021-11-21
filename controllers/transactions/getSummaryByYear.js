const { sendSuccessRes } = require("../../helpers");
const { getAllTransactions } = require("../../services");

const getSummaryByYear = async (req, res) => {
  const { year } = req.params;
  const { _id } = req.user;

  const data = await getAllTransactions({
    owner: _id,
    year,
  });

  let month = Object.values(
    data.reduce((prev, next) => {
      if (!prev[next.month]) {
        prev[next.month] = {
          month: next.month,
          year: next.year,
          sumIncome: 0,
          sumExpense: 0,
        };
      }

      switch (next.operation) {
        case "income":
          prev[next.month].sumIncome += next.value;
          break;
        case "expense":
          prev[next.month].sumExpense += next.value;
          break;
        default:
          0;
      }
      return prev;
    }, {})
  );

  sendSuccessRes(res, month, 200);
};

module.exports = getSummaryByYear;
