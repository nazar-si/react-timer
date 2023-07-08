import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-start transition-all">
      {children}
    </div>
  );
}
