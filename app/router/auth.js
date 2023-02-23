const rourter = require("express").Router();
const { AuthController } = require("../http/controllers/auth.controller");
const { registerValidator } = require("../http/validations/auth");
const { expressValidationMapper } = require("../http/middlewares/checkErrors");

rourter.post("/register", registerValidator(),expressValidationMapper, AuthController.register);

module.exports = {
    authRoutes: rourter,
};
