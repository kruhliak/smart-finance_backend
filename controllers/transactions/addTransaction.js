const { Transaction, User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const addTransaction = async (req, res) => {
  const { _id: UserId, balance } = req.user;
  const { operation, value } = req.body;

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

  await User.findByIdAndUpdate(UserId, { balance: neWBallance });

  const newTransaction = new Transaction({ ...req.body, owner: UserId });
  await newTransaction.save();
  const id = newTransaction._id;

  sendSuccessRes(res, { ...req.body, id });
};
module.exports = addTransaction;
