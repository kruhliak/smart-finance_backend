const { BadRequest } = require("http-errors");

const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "_id email password verify");
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest("Email or password is wrong");
  }

  const { _id } = user;
  const token = user.createToken();
  await User.findByIdAndUpdate(_id, { token });

  sendSuccessRes(res, { data: { token } }, 200);
};

module.exports = login;
