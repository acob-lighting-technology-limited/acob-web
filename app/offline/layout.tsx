import type { Metadata } from 'next';
import '../../app/globals.css';

export const metadata: Metadata = {
  title: 'Offline | ACOB',
  description:
    'You are currently offline. Please check your internet connection.',
};

export default function OfflineLayout({
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
