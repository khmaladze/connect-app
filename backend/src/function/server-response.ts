import { Response } from "express";

interface IResponseData {
  success: boolean;
  message: string;
  data?: any;
}

const successMessage = (res_status: number) => {
  if (res_status == 200 || res_status == 201) {
    return true;
  }
  return false;
};

export const custom_server_response = (
  res: Response,
  res_status: number,
  res_message: string,
  res_data?: any
) => {
  const responseData: IResponseData = {
    success: successMessage(res_status),
    message: res_message,
  };

  if (res_data) {
    responseData.data = res_data;
  }

  return res.status(res_status).json(responseData);
};
