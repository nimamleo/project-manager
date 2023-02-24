const { ProjectModel } = require("../../models/project");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text, image } = req.body;
            const owner = req.user[0]._id;
            const result = await ProjectModel.create({
                title,
                text,
                owner,
                image,
            });
            if (!result)
                throw {
                    status: 400,
                    message: "creating new project not successfull",
                };
            return res.status(201).json({
                status: 201,
                success: true,
                message: "new project created",
            });
        } catch (err) {
            next(err);
        }
    }
    getAllProject() {}
    getProjectById() {}
    getProjectOfUser() {}
    updateProject() {}
    removeProject() {}
}

module.exports = {
    ProjectController: new ProjectController(),
};
