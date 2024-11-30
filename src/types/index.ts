/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseDefault {
  message: string;
  status: "success" | "failed";
  statusCode: number;
  data?: any;
  error?: any;
}
