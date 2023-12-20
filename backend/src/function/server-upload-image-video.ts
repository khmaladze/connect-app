import multer from "multer";
import { CustomRequest } from "../middleware/user-authorization";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// Define valid mime types for images and videos
const validImageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const validVideoMimeTypes = ["video/mp4", "video/mpeg"];

// Multer storage configuration
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/src/uploads");
  },
  filename: (req: CustomRequest, file, cb) => {
    cb(
      null,
      `${Date.now()}_${req.user._id}_${file.originalname.replace(/\s/g, "")}`
    );
  },
});

// Multer middleware for handling file uploads
export const uploadToServer = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const isImage = validImageMimeTypes.includes(file.mimetype);
    const isVideo = validVideoMimeTypes.includes(file.mimetype);
    if (isImage || isVideo) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Invalid file type"));
    }
  },
}).single("file");

// Function to upload a file to Cloudinary
export const uploadToCloudinary = async (
  folderName: string,
  file: Express.Multer.File
): Promise<{ secure_url: string; public_id: string }> => {
  try {
    // Check if the folder exists in Cloudinary, create if not
    const existingFolder = await cloudinary.api.create_folder(folderName);
    const folderPublicId = existingFolder.public_id || "";

    // Determine if the file is an image or a video based on mimetype
    const isImage = validImageMimeTypes.includes(file.mimetype);
    const isVideo = validVideoMimeTypes.includes(file.mimetype);

    if (!isImage && !isVideo) {
      throw new Error("Invalid file type");
    }
    const uniqueFilename = `${Date.now()}_${file.originalname}`;
    let resourceType: any = isImage ? "image" : "video";
    // Upload the file to Cloudinary with the specified folder and public_id
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folderName,
      public_id: folderPublicId + "/" + uniqueFilename,
      resource_type: resourceType,
    });

    // Remove the local file asynchronously
    await fs.unlink(file.path);

    // Return the uploaded file URL and public_id
    return { secure_url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    // Log error and throw a more specific error message
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export default uploadToServer;
