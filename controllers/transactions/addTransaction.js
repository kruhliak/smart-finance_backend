const { Transaction, User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const addTransaction = async (req, res) => {
  const { _id: UserId, balance } = req.user;
  const { operation, value, date, description } = req.body;

  switch (operation) {
    case "income":
      neWBallance = balance + value;
      break;
    case "expense":
      neWBallance = balance - value;
      break;
    default:
      balance;
  }

  const addDate = new Date(date);
  const day = addDate.getDate();
  const month = addDate.getMonth() + 1;
  const year = addDate.getFullYear();

  await User.findByIdAndUpdate(UserId, { balance: neWBallance });

  const lowerDescription = description.toLowerCase();

  const newTransaction = new Transaction({
    ...req.body,
    owner: UserId,
    day,
    month,
    year,
    description: lowerDescription,
  });

  await newTransaction.save();
  const id = newTransaction._id;

  sendSuccessRes(res, { ...req.body, id });
};
module.exports = addTransaction;
