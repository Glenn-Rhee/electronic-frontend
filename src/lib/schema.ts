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

export const addProductSchema = z.object({
  productName: z
    .string({ message: "Invalid product name" })
    .min(1, "Product name must be at least 1 character"),
  category: z.enum(["LAPTOP", "ACCESSORIES"], {
    message: "Categorry must be LAPTOP or ACCESSORIES",
  }),
  brand: z
    .string({ message: "Invalid type of brand" })
    .min(1, "Brand name must be at least 1 character"),
  description: z
    .string({ message: "Invalid type of description" })
    .min(1, "Description must be at least 1 character"),
  urlImage: z
    .string({ message: "Invalid type of image url" })
    .url("Invalid url"),
  price: z
    .number({ message: "Invalid type of price" })
    .min(1000, "Minimum of price is Rp 1.000"),
  stock: z
    .number({ message: "Invalid type of stock" })
    .min(1, "Stock must be at least 1"),
  discount: z
    .number({ message: "Invalid type of discount" })
    .max(100, "Discount must be less than 100"),
  tag: z
    .string({ message: "Invalid type of tag" })
    .min(1, "Tag name must be at least 1 character"),
});
