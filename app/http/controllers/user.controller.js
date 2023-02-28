const { UserModel } = require("../../models/users");
const { createLinkForFiles } = require("../../modules/functions");

class UserController {
    getProfile(req, res, next) {
        try {
            const user = req.user[0];
            user.profile_image = createLinkForFiles(user.profile_image,req)
            return res.status(200).json({
                status: 200,
                success: true,
                user,
            });
        } catch (err) {
            next(err);
        }
    }
    async editProfile(req, res, next) {
        try {
            let data = { ...req.body };
            let userID = req.user[0]._id;
            let fields = ["first_name", "last_name", "skills"];
            let badValues = ["", " ", null, undefined, 0, -1, NaN, [], {}];
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key];
                if (badValues.includes(value)) delete data[key];
            });
            const result = await UserModel.updateOne(
                { _id: userID },
                { $set: data }
            );
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    succes: true,
                    message: "update user successfully done",
                });
            }
            throw { status: 400, message: "updating is not succesfull" };
        } catch (error) {
            next(error);
        }
    }

    async uploadProfileImage(req, res, next) {
        try {
            const userID = req.user[0]._id;
            if (Object.keys(req.file).length == 0)
                throw { status: 400, message: "please upload an image " };
            const filepath = req.file?.path?.substring(7);
            const result = await UserModel.updateOne(
                { _id: userID },
                { $set: { profile_image: filepath } }
            );
            if (result.modifiedCount == 0)
                throw { statuse: 400, message: "updating not successfull" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "updating was successfull",
            });
        } catch (error) {
            next(error);
        }
    }
    addSkills() {}
    editSkills() {}
    acceptInviteInTeam() {}
    rejectInviteInTeam() {}
}

module.exports = {
    UserController: new UserController(),
};
