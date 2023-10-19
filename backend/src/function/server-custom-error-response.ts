import { Response } from "express";
import { custom_server_response } from "./server-response";
import {
  apiSuccessStatusMessage,
  serverErrorMessage,
} from "./server-route-messages";
import fs from "fs";

interface IJoiErrorMessageData {
  details: [{ message: string }];
}

export const customServerError = async (
  res: Response,
  joi_error_message: IJoiErrorMessageData | any,
  req?: any
) => {
  if (req) {
    const file = req.file;
    if (file) {
      await fs.unlinkSync(file.path);
    }
  }

  // JOI validation error
  if (joi_error_message.details) {
    if (joi_error_message.details[0].message) {
      return customJoiValidationResponse(
        res,
        joi_error_message.details[0].message
      );
    }
  }

  return custom_server_response(
    res,
    500,
    apiSuccessStatusMessage.no_success,
    serverErrorMessage.server_error
  );
};

export const customJoiValidationResponse = (
  res: Response,
  joi_message: string
) => {
  return custom_server_response(
    res,
    400,
    apiSuccessStatusMessage.no_success,
    joi_message
  );
};