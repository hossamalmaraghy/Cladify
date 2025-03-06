import multer from "multer";

// Multer Configuration
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage})

export default upload;