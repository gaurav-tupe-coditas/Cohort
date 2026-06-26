import multer from "multer";
import fs from "node:fs"

if(!fs.existsSync("./uploads")){
  fs.mkdirSync("./uploads",{recursive:true})
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
