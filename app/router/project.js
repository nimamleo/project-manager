const { ProjectController } = require("../http/controllers/project.controller");
const { createProjectValidator } = require("../http/validations/project");
const { expressValidationMapper } = require("../http/middlewares/checkErrors");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { uploadFile } = require("../modules/express-fileupload");
const fileupload = require("express-fileupload");
const { mongoIdValidator } = require("../http/validations/publice");

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

router.post("/list", checkLogin, ProjectController.getAllProject);
router.post(
    "/:id",
    checkLogin,
    mongoIdValidator(),
    expressValidationMapper,
    ProjectController.getProjectById
);
router.post(
    "/remove/:id",
    checkLogin,
    mongoIdValidator(),
    expressValidationMapper,
    ProjectController.removeProject
);
router.post(
    "/edit/:id",
    checkLogin,
    mongoIdValidator(),
    expressValidationMapper,
    ProjectController.updateProject
);

module.exports = {
    projectRoutes: router,
};
