const { ProjectController } = require("../http/controllers/project.controller");
const { createProjectValidator } = require("../http/validations/project");
const { expressValidationMapper } = require("../http/middlewares/checkErrors");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { uploadFile } = require("../modules/express-fileupload");
const fileupload = require('express-fileupload');

const router = require("express").Router();

router.post(
    "/create",
    fileupload(),
    checkLogin,
    uploadFile,
    createProjectValidator(),
    expressValidationMapper,
    ProjectController.createProject
);

module.exports = {
    projectRoutes: router,
};
