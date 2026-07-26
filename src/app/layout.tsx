import type { Metadata } from 'next';
import { clubConfig } from '../../config/club.config';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: clubConfig.name,
  description: clubConfig.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
