import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/navigation';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for api, _next/static, _next/image, files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
