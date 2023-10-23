import cloudinary from "cloudinary";
import config from "../../../config/config";

// Function to delete an image from Cloudinary
export async function deleteImageFromCloudinary(
  imageUrl: string
): Promise<boolean> {
  try {
    let url = imageUrl.slice(62, imageUrl.length);
    url = url.slice(0, url.length - 4);

    // Configure Cloudinary with your credentials
    cloudinary.v2.config({
      cloud_name: config.cloudinary_cloud_name,
      api_key: config.cloudinary_api_key,
      api_secret: config.cloudinary_api_secret,
    });

    // Send a request to Cloudinary to delete the image
    const result = await cloudinary.v2.api.delete_resources([String(url)], {
      type: "upload",
      resource_type: "image",
    });

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}
