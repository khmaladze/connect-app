import { Response } from "express";

interface IResponseData {
  success: boolean;
  message: string;
  data?: any;
}

export const custom_server_response = (
  res: Response,
  res_status: number,
  res_success: boolean,
  res_message: string,
  res_data?: any
) => {
  const responseData: IResponseData = {
    success: res_success,
    message: res_message,
  };

  if (res_data) {
    responseData.data = res_data;
  }

  return res.status(res_status).json(responseData);
};
