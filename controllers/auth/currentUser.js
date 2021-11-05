const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findOne({ _id }, "_id email");

  sendSuccessRes(res, { data: { result } }, 200);
};

module.exports = currentUser;
