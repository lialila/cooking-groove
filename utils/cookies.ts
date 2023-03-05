import cookie from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  const isProduction = process.env.NODE_ENV === 'production';
  // in the deployed version we want cookie to be sent only on the https
  // in the development verion wee want the cookie to be sent to http

  const maxAge = 60 * 60 * 24;
  // 24 hours in seconds
  // maxAge is porperty that browser understands for cookies
  // not only expire the token but also the cookie
  return cookie.serialize('sessionToken', token, {
    // for new borwsers
    maxAge: maxAge,
    // for old browsers like internet explorer
    expires: new Date(
      Date.now() + maxAge * 1000,
      // 24 hours in miliseconds
    ),

    httpOnly: true,
    secure: isProduction,
    // so the cookie will work in the whole app
    path: '/',

    // web.dev/samesite-cookies-explainer/
    sameSite: 'lax',
  });
}
