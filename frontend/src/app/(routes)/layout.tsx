import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ChatWidget from "@/components/chat/ChatWidget";
import React from "react";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function RoutesLayout({ children }: RoutesLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-4">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default RoutesLayout;
