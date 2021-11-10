const { Transaction } = require("../models");

const getOperationType = async (req, res) => {
  const { _id: ownerId } = req.user;

  const data = await Transaction.find({ ownerId });
  return data;
};

module.exports = getOperationType;
