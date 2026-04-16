import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const runtime = 'edge';
export const alt = 'Octadecimal Cloud';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });

  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: '#171717',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            18
          </div>
          <div style={{ fontSize: 24, color: '#737373', fontFamily: 'monospace' }}>
            octadecimal.cloud
          </div>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: '#171717',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {t('defaultTitle')}
        </div>

        <div style={{ fontSize: 20, color: '#737373', maxWidth: 900 }}>
          {t('defaultDescription')}
        </div>
      </div>
    ),
    size,
  );
}
