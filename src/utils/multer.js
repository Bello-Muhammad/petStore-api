// const multer = require("multer");
// const path = require('path')

// const uploadMultiple = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 1000000},
//     fileFilter: async function (req, file, cb) {
//         checkFileType(file, cb)
//     }
// }).array('image', 12);

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 1000000},
//     fileFilter: async function (req, file, cb) {
//         checkFileType(file, cb)
//     }
// }).single('image');

// //check file type
// function checkFileType (file, cb) {
//     //allowed ext
//     const fileTypes = /jpeg|jpg|png|gif/;
//     //check ext
//     const extName =  fileTypes.test(path.extname(file.originalname).toLowerCase())
//     //check mime
//     const mimeType = fileTypes.test(file.mimetype)

//     if(mimeType && extName) {
//         return cb(null, true);
//     } else {
//         cb('Error: image only !!!');
//     }
// }

// module.exports = {
//     upload,
//     uploadMultiple
// }