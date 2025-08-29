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