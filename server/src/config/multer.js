import multer, { diskStorage } from "multer";
import { join } from "path";

//image upload
const storage = diskStorage({
    destination: (req, res, cb) => {
         cb(null, join("./files/"));
    },

    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() +"-"+ file.originalname);
    },

    
});

// checking file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.', 400), false);
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});