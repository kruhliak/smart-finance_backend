const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findOne({ _id });

  sendSuccessRes(res, { result }, 200);
};

module.exports = currentUser;
