const { ProjectModel } = require("../../models/project");
const autoBind = require("auto-bind");

class ProjectController {
    constructor() {
        autoBind(this);
    }
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
    async getAllProject(req, res, next) {
        try {
            const owner = req.user[0]._id;
            const projects = await ProjectModel.find({ owner });
            return res.status(200).json({
                status: 200,
                success: true,
                projects,
            });
        } catch (err) {
            next(err);
        }
    }
    async findProject(projectId, owner) {
        const project = await ProjectModel.findOne({ owner, _id: projectId });
        if (!project) throw {  status: 404, message: "project not found" };
        return project;
    }
    async getProjectById(req, res, next) {
        try {
            const owner = req.user[0]._id;
            const projectId = req.params.id;
            const project = await this.findProject(projectId, owner);
            return res.status(200).json({
                status: 200,
                success: true,
                project,
            });
        } catch (err) {
            next(err);
        }
    }
    async removeProject(req, res, next) {
        try {
            const owner = req.user[0]._id;
            const projectId = req.params.id;
            await this.findProject(projectId, owner);
            const deleteProjectResult = await ProjectModel.deleteOne({
                    _id: projectId,
                });
            console.log(deleteProjectResult);
            if (deleteProjectResult.deletedCount == 0)
                throw { status: 400, message: "project did not delete" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "project deleted suucessfully",
            });
        } catch (err) {
            next(err);
        }
    }
    getProjectOfUser() {}
    updateProject() {}
}

module.exports = {
    ProjectController: new ProjectController(),
};
