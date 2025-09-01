"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useAPI";
import { tokenManager, userManager } from "@/utils/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  const { mutate: register, loading, error: registerError } = useRegister();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Tüm alanlar zorunludur");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    try {
      const result = await register({ 
        name, 
        email, 
        password, 
        role: 'USER' 
      });
      
      // Backend response: { success: true, data: { token, user } }
      if (result?.success && result?.data?.token) {
        const { token, user } = result.data;
        
        // Save token and user data only on client side
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", token);
          tokenManager.setToken(token);
          userManager.setUser(user);
        }
        
        // Redirect to home page
        router.push("/");
      } else {
        setError("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (error) {
      console.error("Register error:", error);
      
      // Handle specific error messages
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-2xl">
        {/* Başlık */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            🚀 Aramıza Katıl!
          </h1>
          <p className="mt-2 text-gray-500">Hemen kayıt ol ve başlayalım</p>
        </div>

        {/* Error Message - Only show on client side */}
        {isClient && (error || registerError) && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error || registerError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Ad Soyad
            </label>
            <input
              type="text"
              placeholder="Adınız Soyadınız"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Şifre Tekrar
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-green-600 rounded-xl hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isClient && loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Kayıt yapılıyor...
              </div>
            ) : (
              "Kayıt Ol"
            )}
          </button>
        </form>

        {/* Alt Kısım */}
        <p className="text-sm text-center text-gray-500">
          Zaten hesabınız var mı?{" "}
          <a href="/auth/login" className="text-green-600 hover:underline">
            Giriş Yap
          </a>
        </p>
      </div>
    </div>
  );
}
