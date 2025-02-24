import Image from 'next/image'

import React from 'react';
import { LoginBtn } from '../components/auth/loginButton';

export default function Home() {
  return (
    <div className="bg-bgDefault min-h-screen flex flex-col justify-center items-center">
      <LoginBtn/>
    </div>
  );
}

