"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAPI";
import { tokenManager, userManager } from "@/utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  const { mutate: login, loading, error: loginError } = useLogin();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email ve şifre alanları zorunludur");
      return;
    }

    try {
      const result = await login({ email, password });
      
      // Backend response: { success: true, data: { token, user } }
      if (result?.success && result?.data?.token) {
        const { token, user } = result.data;
        
        // Save token and user data only on client side
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", token);
          tokenManager.setToken(token);
          userManager.setUser(user);
        }
        
        // Redirect based on user role
        if (user?.role === 'ADMIN') {
          router.push("/admin");
        } else if (user?.role === 'HOTEL_OWNER') {
          router.push("/hotel-owner");
        } else {
          router.push("/");
        }
      } else {
        setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle specific error messages
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-2xl">
        {/* Başlık */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">👋 Hoş Geldiniz!</h1>
          <p className="mt-2 text-gray-500">Devam etmek için giriş yapın</p>
        </div>

        {/* Error Message - Only show on client side */}
        {isClient && (error || loginError) && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error || loginError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isClient && loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Giriş yapılıyor...
              </div>
            ) : (
              "Giriş Yap"
            )}
          </button>
        </form>

        {/* Alt Kısım */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            Hesabınız yok mu?{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Kayıt Ol
            </a>
          </p>
          
        </div>
      </div>
    </div>
  );
}
