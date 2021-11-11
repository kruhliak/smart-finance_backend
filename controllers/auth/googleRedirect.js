const queryString = require("query-string");
const axios = require("axios");
require("dotenv").config();
const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

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
  console.log(userData);
  //   userData: {
  //   id: '117526688030707006499',
  //   email: 'stanislav.kruhliak@gmail.com',
  //   verified_email: true,
  //   name: 'Stanislav Kruhliak',
  //   given_name: 'Stanislav',
  //   family_name: 'Kruhliak',
  //   picture: 'https://lh3.googleusercontent.com/a/AATXAJwsOBa-xhzqYO44fTAOJOYyWK3j-eLdXiMETXZ-=s96-c',
  //   locale: 'ru'
  // }
  const { email, name, id } = userData.data;
  const user = await User.findOne({ email });

  if (!user) {
    const googleUser = new User({ email, name });
    googleUser.setPassword(id);
    await googleUser.save();
  }

  return res.redirect(`${process.env.FRONTEND_URL}/`);
};

module.exports = googleRedirect;
