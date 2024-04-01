import multer from "multer";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {cb(null, "/tmp")}
})
export const upload = multer({ storage });