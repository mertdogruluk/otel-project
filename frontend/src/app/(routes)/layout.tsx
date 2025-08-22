import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ChatWidget from "@/components/chat/ChatWidget";
import React from "react";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function RoutesLayout({ children }: RoutesLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}

export default RoutesLayout;
