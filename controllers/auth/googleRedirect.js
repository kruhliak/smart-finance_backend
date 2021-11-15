const queryString = require("query-string");
const axios = require("axios");
require("dotenv").config();
const { User } = require("../../models");
const login = require("./login");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email, name } = userData.data;
  const user = await User.findOne({ email });

  if (!user) {
    const googleUser = new User({ email, name });
    await googleUser.save();
  }
  const { _id } = user;
  const token = user.createToken();
  await User.findByIdAndUpdate(_id, { token });

  return res.redirect(`${process.env.FRONTEND_URL}/?${token}`);
};

module.exports = googleRedirect;
