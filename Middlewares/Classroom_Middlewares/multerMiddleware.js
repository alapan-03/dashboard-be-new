const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();

console.log(process.env.API_SECRET)
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// console.log("uploadHello")

// Set up Cloudinary storage with Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder in Cloudinary to store files
        allowed_formats: ['pdf', 'docx', 'pptx', 'jpg', 'png'],
      },
})

const upload = multer({ storage: storage });
// console.log("uploadHello")

// Export the upload middleware
module.exports = upload;