import React from 'react';
import Footer from './Footer.tsx/Footer';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div id="layout" className="w-full min-h-[100vh] flex flex-col items-center absolute">
      <div className="flex-1">{children}</div>
      <Footer></Footer>
    </div>
  );
}
