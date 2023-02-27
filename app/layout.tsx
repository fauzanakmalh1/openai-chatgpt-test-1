import { Nunito } from '@next/font/google';

import Providers from './providers';

// import "react-toastify/dist/ReactToastify.css";
import 'nprogress/nprogress.css';
import '../styles/globals.css';

const nunito = Nunito({
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body
        className={
          process.env.NODE_ENV === 'development' ? 'debug-screens' : ''
        }
      >
        <Providers>
          {children}

          <div id="__modal" />
        </Providers>
      </body>
    </html>
  );
}
