/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseDefault {
  message: string;
  status: "success" | "failed";
  statusCode: number;
  data?: any;
  error?: any;
}

export interface DataStore {
  id: string;
  storeName: string;
  storeDescription: string;
  storeCategory: string;
  openStore: string;
  closeStore: string;
  urlImage: string;
  bankId: string;
  accountNumber: string;
  bankName: string;
}
