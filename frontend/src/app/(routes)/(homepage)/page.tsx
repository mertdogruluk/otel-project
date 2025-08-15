import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <>
    <div>HomePage</div>
    </>
  )
=======
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Otel Project</span>
            </div>
            
            {/* Admin Avatar - Sağ üst köşede */}
            <Link href="/dashboard">
              <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                <AvatarImage src="/admin/images/avatar/user-1.png" />
                <AvatarFallback className="bg-blue-600 text-white">A</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Otel Yönetim Sistemi
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Modern ve kullanıcı dostu arayüzü ile otel işletmenizi kolayca yönetin. 
            Rezervasyonlar, müşteriler ve raporlar tek platformda.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Rezervasyon Yap
          </Button>
        </div>

        {/* Simple Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Konforlu Odalar</h3>
            <p className="text-gray-600">Modern ve ferah odalarımızda konforlu konaklama</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lezzetli Yemekler</h3>
            <p className="text-gray-600">Yerel ve uluslararası lezzetlerden oluşan menümüz</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Spa & Wellness</h3>
            <p className="text-gray-600">Dinlendirici spa ve wellness hizmetlerimiz</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Otel Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
>>>>>>> a940f84aea6128b98a3094713097b858f32ad204
}

export default HomePage;