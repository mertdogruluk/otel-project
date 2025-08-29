import { z } from "zod";

export const infoFormSchema = z.object({
  ad: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  soyad: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  ulkeBolge: z.string().min(2, "Ülke/Bölge en az 2 karakter olmalıdır"),
  telefon: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  ozelIstek: z.string().optional(),
});

export type InfoFormData = z.infer<typeof infoFormSchema>;

// User form schema
export const userFormSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  confirmPassword: z.string().min(6, "Şifre onayı en az 6 karakter olmalıdır"),
  permissions: z.object({
    addProduct: z.boolean(),
    updateProduct: z.boolean(),
    deleteProduct: z.boolean(),
    applyDiscount: z.boolean(),
    createCoupon: z.boolean(),
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

export type UserFormData = z.infer<typeof userFormSchema>;

// Payment form schema
export const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, "Kart numarası 16 haneli olmalıdır").max(19, "Kart numarası çok uzun"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Geçerli bir son kullanma tarihi giriniz (AA/YY)"),
  cvv: z.string().min(3, "CVV 3 haneli olmalıdır").max(4, "CVV 4 haneli olmalıdır"),
  address: z.string().min(10, "Adres en az 10 karakter olmalıdır"),
  country: z.string().min(2, "Ülke/Bölge en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  specialRequest: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentFormSchema>;
