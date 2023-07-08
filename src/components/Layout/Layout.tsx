import React from 'react';
import Footer from './Footer.tsx/Footer';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-start transition-all absolute">
      {children}
      <Footer></Footer>
    </div>
  );
}
