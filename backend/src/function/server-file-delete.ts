import cloudinary from "cloudinary";
import config from "../../../config/config";

// Function to delete an file from Cloudinary
export const deleteFileFromCloudinary = async (
  fileUrl: string,
  resourceType: string
): Promise<boolean> => {
  try {
    // Configure Cloudinary with your credentials
    cloudinary.v2.config({
      cloud_name: config.cloudinary_cloud_name,
      api_key: config.cloudinary_api_key,
      api_secret: config.cloudinary_api_secret,
    });

    // Send a request to Cloudinary to delete the file
    await cloudinary.v2.api.delete_resources([String(fileUrl)], {
      type: "upload",
      resource_type: resourceType,
    });

    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    // Optionally throw a more specific error or customize the error message
    throw new Error("Failed to delete file from Cloudinary");
  }
};
