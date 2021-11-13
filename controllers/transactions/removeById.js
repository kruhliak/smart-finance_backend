const { Transaction, User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const removeById = async (req, res) => {
  const { operationId } = req.params;
  const { _id: UserId, balance } = req.user;

  const transaction = await Transaction.findById(operationId);

  switch (transaction.operation) {
    case "income":
      neWBallance = balance - transaction.value;
      break;
    case "expense":
      neWBallance = balance + transaction.value;
      break;
    default:
      balance;
  }

  await User.findByIdAndUpdate(UserId, { balance: neWBallance });

  const result = await Transaction.findByIdAndDelete(operationId);

  if (!result) {
    throw new NotFound(`Transaction with id=${operationId} not found`);
  }

  sendSuccessRes(res, { message: "Success delete" });
};

module.exports = removeById;
