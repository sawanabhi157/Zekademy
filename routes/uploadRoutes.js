import express from "express";
const router = express.Router();
import multer from "multer";

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    status: 200,
    message: "Success",
    img_id: req.file.destination + "/" + req.file.filename,
  });
});

export default router;
