const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const verifyToken = nanoid();

  const newUser = new User({ email, verifyToken });

  newUser.setPassword(password);

  await newUser.save();
  sendSuccessRes(res, { message: "Success created" }, 201);
};

module.exports = signup;
