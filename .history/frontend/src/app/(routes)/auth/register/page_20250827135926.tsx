import AuthForm from "../../../../components/forms/AuthForm";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = (email: string, password: string) => {
    alert(`Kayıt başarılı: ${email}`);
    router.push("/auth/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm
        title="Register"
        buttonText="Register"
        onSubmit={handleRegister}
      />
    </div>
  );
};

export default RegisterPage;
