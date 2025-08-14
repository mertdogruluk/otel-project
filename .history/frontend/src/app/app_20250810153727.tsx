// pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
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

