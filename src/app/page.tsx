import Image from 'next/image'

import React from 'react';
import { LoginBtn } from './components/auth/loginButton';

export default function Home() {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center">
      <LoginBtn/>
      {/* Header */}
      <header className="w-full bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: 'url(/background-image.jpg)' }}>
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto rounded-full" />
          <h1 className="text-2xl font-bold mt-2">@havaianas</h1>
        </div>
      </header>

      {/* Contador */}
      <section className="text-center mt-6">
        <h2 className="text-lg font-semibold">Existimos há:</h2>
        <div className="flex flex-wrap items-center justify-center max-w-[400px] gap-2 mt-2">
          {['53 anos', '5 meses', '17 dias', '0 horas', '56 minutos', '42 segundos'].map((item, index) => (
            <div key={index} className="bg-white shadow-md p-3 rounded-md text-sm font-medium">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="w-full max-w-md mt-8">
        {Array(4).fill('').map((_, index) => (
          <a
            key={index}
            href="#"
            className="block bg-white shadow-lg p-4 mb-4 rounded-md flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <img src="/link-icon.png" alt="Icon" className="w-8 h-8" />
              <span className="text-sm font-medium">The standard Lorem Ipsum passage, used since the 1500s</span>
            </div>
            <div className="text-gray-400">...</div>
          </a>
        ))}
      </section>

      {/* Redes Sociais */}
      <footer className="flex justify-center gap-6 mt-8">
        {['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'].map((icon, index) => (
          <a key={index} href="#" className="text-gray-600 hover:text-gray-800">
            <img src={`/${icon}-icon.png`} alt={icon} className="w-6 h-6" />
          </a>
        ))}
      </footer>

      {/* História */}
     
    </div>
  );
}

