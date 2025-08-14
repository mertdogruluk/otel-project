// pages/_app.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-8rem)]">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
