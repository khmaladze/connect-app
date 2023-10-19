// import { Response } from "express";
// import { customServerError } from "../../function/server-custom-error-response";
// import { custom_server_response } from "../../function/server-response";
// import {
//   userProfileMessage,
//   multerImageMessage,
//   apiSuccessStatusMessage,
// } from "../../function/server-route-messages";
// import { User } from "../../models/user-model";
// import { CustomRequest } from "../../middleware/user-authorization";
// import { uploadImageToCloudinary } from "../../function/server-upload-image";

// export const businessLogic = async (req: CustomRequest, res: Response) => {
//   try {
//     const userProfileId: number = req.user._id;

//     if (!userProfileId) {
//       return custom_server_response(
//         res,
//         400,
//         apiSuccessStatusMessage.no_success,
//         userProfileMessage.user_required
//       );
//     }

//     const file = req.file; // Assuming the file is sent as 'image' field in the form data

//     if (!file) {
//       return custom_server_response(
//         res,
//         400,
//         apiSuccessStatusMessage.no_success,
//         multerImageMessage.image_required
//       );
//     }

//     // Upload the image to Cloudinary in the specified folder
//     const imageUrl = await uploadImageToCloudinary(String(userProfileId), file);

//     const newData = await User.findOneAndUpdate(
//       { _id: userProfileId },
//       { backgroundImage: imageUrl },
//       {
//         new: true,
//       }
//     ).select("_id backgroundImage");

//     return custom_server_response(
//       res,
//       200,
//       apiSuccessStatusMessage.success,
//       userProfileMessage.user_backgroundImage_update_success,
//       newData
//     );
//   } catch (error) {
//     return customServerError(res, error, req);
//   }
// };
