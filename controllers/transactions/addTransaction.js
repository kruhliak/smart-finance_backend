const { Transaction } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const addTransaction = async (req, res) => {
  const { _id: UserId } = req.user;

  const newTransaction = new Transaction({ ...req.body, owner: UserId });
  await newTransaction.save();
  sendSuccessRes(res, { message: "Success created" });
};
module.exports = addTransaction;
