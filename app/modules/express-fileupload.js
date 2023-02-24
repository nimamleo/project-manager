const path = require("path");
const { createUploadPath } = require("./functions");
const uploadFile = async (req, res, next) => {
    try {
        if (Object.keys(req.files).length == 0)
            throw {
                status: 400,
                message: "please upload an image for your project",
            };
        let image = req.files.image;
        const image_path = path.join(
            createUploadPath(),
            Date.now() + path.extname(image.name)
        );
        req.body.image = image_path;
        let uploadPath = path.join(__dirname, "..", "..", image_path);
        image.mv(uploadPath, (err) => {
            if (err)
                throw { status: 500, message: "uploading was not successfull" };
            next();
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadFile,
};
