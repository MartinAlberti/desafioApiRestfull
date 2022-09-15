const express = require("express")
const multer = require("multer")

const router = express.Router()

// diskStorage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.filename)
    }
});

const upload = multer({ storage })


router.post("/file", upload.single(`single-file`), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error("Debe cargar un archivo");
        error.httpStatusCode = 400;
      return  next(error);
    }
    res.send("ok")
})

router.post("/files", upload.array("multiple-files"), (req, res, next) => {
    const file = req.files
    if (!files || files.length < 1) {
        const error = new Error("Debe cargar uno o mas archivo");
        error.httpStatusCode = 400;
      return  next(error)
       }
      res.send("ok")

})

module.exports = router