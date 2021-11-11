const { Conflict } = require("http-errors");

const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email, name });

  newUser.setPassword(password);

  await newUser.save();
  sendSuccessRes(res, { message: "Success created" }, 201);
};

module.exports = signup;
