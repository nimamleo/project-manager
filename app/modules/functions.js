const { genSaltSync, hashSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashString(str) {
    const salt = genSaltSync(10);
    return hashSync(str, salt);
}

function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "3days",
    });
    return token;
}

module.exports = {
    hashString,
    tokenGenerator,
};
