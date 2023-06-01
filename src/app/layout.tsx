import '@styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
      </head>
      <body>
        <div className="overflow-hidden rounded-lg bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <main className="bg-page-gradient pt-nav-height">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
