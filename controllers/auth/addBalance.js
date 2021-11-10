const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const addBalance = async (req, res) => {
  const { _id: UserId } = req.user;
  const { balance } = req.body;

  await User.findByIdAndUpdate(UserId, { balance });

  sendSuccessRes(res, { balance }, 200);
};

module.exports = addBalance;
