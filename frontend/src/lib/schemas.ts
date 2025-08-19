import { z } from "zod";

export const bilgilerFormSchema = z.object({
  ad: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  soyad: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  ulkeBolge: z.string().min(2, "Ülke/Bölge en az 2 karakter olmalıdır"),
  telefon: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  ozelIstek: z.string().optional(),
});

export type BilgilerFormData = z.infer<typeof bilgilerFormSchema>;

