import multer from "multer";
import { CustomRequest } from "../middleware/user-authorization";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const storage: any = multer.diskStorage({
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

let uploadImageToServer = multer({ storage: storage }).single("image");

export const uploadImageToCloudinary = async (
  folderName: string,
  file: any
) => {
  try {
    // Check if the folder exists in Cloudinary
    const existingFolder = await cloudinary.api.create_folder(folderName);

    // If the folder already exists, use its public_id
    const folderPublicId = existingFolder.public_id || "";

    // Upload the image to Cloudinary with the specified folder and public_id
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folderName,
      public_id: folderPublicId + "/" + file.originalname,
    });

    // Check if the image file exists
    if (fs.existsSync(file.path)) {
      // Remove the image file
      await fs.unlinkSync(file.path);
    }

    // Return the uploaded image URL
    return result.secure_url;
  } catch (error) {
    // Handle any errors
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

export default uploadImageToServer;
