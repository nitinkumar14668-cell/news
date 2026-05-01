
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'USA News',
  description: 'USA News portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


