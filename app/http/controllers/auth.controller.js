const { validationResult } = require("express-validator");
const { hashString } = require("../../modules/functions");
const { UserModel } = require("../../models/users");

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password, email, mobile } = req.body;
            const hash_password = hashString(password);
            const user = new UserModel({
                username,
                email,
                password: hash_password,
                mobile,
            })
            console.log(user);
            await user.save()
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    login() {}
    resetPassword() {}
}

module.exports = {
    AuthController: new AuthController(),
};
