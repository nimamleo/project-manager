const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");

const rourter = require("express").Router();

rourter.get("/profile", checkLogin, UserController.getProfile);

module.exports = {
    userRoutes: rourter,
};
