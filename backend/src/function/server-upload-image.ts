import multer from "multer";
import { CustomRequest } from "../middleware/user-authorization";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

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
const uploadImageToServer = multer({ storage: storage }).single("image");

// Function to upload an image to Cloudinary
export const uploadImageToCloudinary = async (
  folderName: string,
  file: Express.Multer.File
): Promise<{ secure_url: string; public_id: string }> => {
  try {
    // Check if the folder exists in Cloudinary, create if not
    const existingFolder = await cloudinary.api.create_folder(folderName);
    const folderPublicId = existingFolder.public_id || "";

    // Generate a unique filename for the uploaded image
    const uniqueFilename = `${Date.now()}_${file.originalname
      .replace(/\s/g, "")
      .replace(/\..+$/, "")}`;

    // Upload the image to Cloudinary with the specified folder and public_id
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folderName,
      public_id: folderPublicId + "/" + uniqueFilename,
    });

    // Check if the local image file exists, and remove it
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }

    // Return the uploaded image URL and public_id
    return { secure_url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    // Log error and throw a more specific error message
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export default uploadImageToServer;
