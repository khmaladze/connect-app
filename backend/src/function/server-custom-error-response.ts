import { Response } from "express";
import { custom_server_response } from "./server-response"; // Importing custom server response function
import fs from "fs";

// Object containing a generic server error message
const serverErrorMessage = {
  server_error: "server error",
};

// Interface to represent the data structure of Joi validation error messages
interface IJoiErrorMessageData {
  details: [{ message: string }];
}

// Function to handle custom server errors, including cleanup (e.g., deleting uploaded files)
export const customServerError = async (
  res: Response,
  joi_error_message: IJoiErrorMessageData | any, // Accepts Joi validation error data or any other error data
  req?: any // Optional request object to perform additional actions
) => {
  // If a request object is provided and it contains a file, delete the file
  if (req && req.file) {
    const file = req.file;
    if (file) {
      await fs.unlinkSync(file.path);
    }
  }

  // If the error is a Joi validation error, handle it with a specific function
  if (joi_error_message.details) {
    if (joi_error_message.details[0].message) {
      return customJoiValidationResponse(
        res,
        joi_error_message.details[0].message
      );
    }
  }

  // If it's not a Joi validation error, respond with a generic server error
  return custom_server_response(res, 500, serverErrorMessage.server_error);
};

// Function to handle custom Joi validation error responses
export const customJoiValidationResponse = (
  res: Response,
  joi_message: string
) => {
  // Respond with a 400 Bad Request status and the provided Joi error message
  return custom_server_response(res, 400, joi_message);
};
