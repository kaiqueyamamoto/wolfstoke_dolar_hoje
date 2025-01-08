import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dólar Hoje – Qual é o valor do dólar agora? | Cotação do Dólar',
  description:
    'Saiba agora qual é o valor do dólar hoje em tempo real. Veja se está subindo ou caindo e confira a cotação do dólar para ficar sempre atualizado.',
  keywords: ['Dólar hoje', 'Cotação do dólar', 'Qual é o valor do dólar'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
