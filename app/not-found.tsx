import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="pl">
      <body
        style={{
          fontFamily: 'system-ui',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          padding: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
          <p style={{ color: '#737373', marginBottom: '2rem' }}>
            Strona nie znaleziona / Page not found
          </p>
          <Link
            href="/pl"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: '#171717',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '0.375rem',
            }}
          >
            Strona glowna / Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
