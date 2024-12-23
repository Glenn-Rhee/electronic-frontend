import parsePhoneNumberFromString from "libphonenumber-js";
import { z, ZodType } from "zod";

export const setProfile: ZodType = z.object({
  phone: z
    .string({ message: "Phone is required!" })
    .min(10, { message: "Phone number must be at least 10 " })
    .refine((value) => {
      const phoneNumber = parsePhoneNumberFromString("+62" + value);
      return phoneNumber && phoneNumber.isValid();
    }),
  address: z.string({ message: "Invalid address" }),
  sosmed: z.string({ message: "Invalid type of social media" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" }),
  fullname: z.string({ message: "Invalid type of fullname" }),
  storeName: z.string({ message: "Invalid type of store name" }),
  storeDescription: z.string({ message: "Invalid type of store description" }),
  storeCategory: z.enum(["LAPTOP", "ACCESSORIES"]),
  openStore: z.string({ message: "Invalid type of open Store" }),
  closeStore: z.string({ message: "Invalid type of close Store" }),
  bankName: z.string({ message: "Invalid type of bank name" }),
  accountNumber: z.string({ message: "Invalid type of account number" }),
});

export const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" }),
  fullname: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 " })
    .refine((value) => {
      const phoneNumber = parsePhoneNumberFromString("+62" + value);
      return phoneNumber && phoneNumber.isValid();
    }),
  dateOfBirth: z.string().date("Invalid date of birth"),
});
