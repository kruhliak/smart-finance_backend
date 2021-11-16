const { Transaction } = require("../models");

const getAllTransactions = async (req, res) => {
  const { _id: ownerId } = req.user;

  const data = await Transaction.find({ ownerId });
  return data;
};

module.exports = getAllTransactions;
