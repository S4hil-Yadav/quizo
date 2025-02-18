import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 100,
  },
});

export default upload;
