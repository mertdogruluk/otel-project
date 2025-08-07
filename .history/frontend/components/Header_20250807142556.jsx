// components/Header.jsx
export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">OtelRez</div>
      <nav className="space-x-4">
        <a href="/" className="hover:underline">Ana Sayfa</a>
        <a href="/login" className="hover:underline">Giriş</a>
        <a href="/register" className="hover:underline">Kayıt</a>
      </nav>
    </header>
  );
}

