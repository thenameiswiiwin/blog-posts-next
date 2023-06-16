import '@styles/globals.css';

import { Navbar } from '@components/Navbar';
import { Providers } from '@stores/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
      </head>
      <body suppressHydrationWarning>
        <div className="overflow-hidden rounded-lg bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
            <main className="bg-page-gradient pt-nav-height">
              <Providers>{children}</Providers>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
