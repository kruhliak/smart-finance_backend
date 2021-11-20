const { Transaction } = require("../models");

const getAllTransactions = async (params) => {
  const data = await Transaction.find(params);
  return data;
};

module.exports = getAllTransactions;
