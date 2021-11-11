const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const addBalance = require("./addBalance");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  addBalance,
  googleAuth,
  googleRedirect,
};
