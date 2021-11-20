const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const currentUser = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findOne({ _id });

  const { name, balance, token } = result;
  sendSuccessRes(res, { token, id: _id, name, balance }, 200);
};

module.exports = currentUser;
