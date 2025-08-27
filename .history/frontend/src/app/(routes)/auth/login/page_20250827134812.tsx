import AuthForm from "../../../../components/forms/AuthForm";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    alert(`Giriş başarılı: ${email}`);
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm title="Login" buttonText="Login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
