import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GAP//BREAKERS — Rebuild Reality',
  description:
    'A multiplayer collaborative puzzle game where different perspectives must unite to save the floating city. Bridge the Gap.',
  keywords: ['multiplayer game', 'collaboration', 'puzzle', 'hackathon', 'gap breakers'],
  openGraph: {
    title: 'GAP//BREAKERS — Rebuild Reality',
    description: 'Different realities. One impossible mission.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
