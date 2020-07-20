import crypto from "crypto";
import multer, { Options } from "multer";
import path from "path";

export const pathToTmpFolder = path.resolve(__dirname, "..", "..", "tmp");

const multerConfig = {
  dest: pathToTmpFolder,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pathToTmpFolder);
    },
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
} as Options;

export default multerConfig;
