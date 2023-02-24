const { ProjectModel } = require("../../models/project");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text, image, tags } = req.body;
            const owner = req.user[0]._id;
            const result = await ProjectModel.create({
                title,
                text,
                owner,
                image,
                tags,
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
    async getAllProject(req,res,next) {
        try {
            const owner = req.user[0]._id
            const projects = await ProjectModel.find({owner})
            return res.status(200).json({
                status:200,
                success:true,
                projects
            })
        } catch (err) {
            next(err)
        }
    }
    getProjectById() {}
    getProjectOfUser() {}
    updateProject() {}
    removeProject() {}
}

module.exports = {
    ProjectController: new ProjectController(),
};
