export const config = {
  matcher: '/logout',
};

// in middleare request headers are read only
export function middlewar(request) {
  // creating a new headers obj
  const requestHeaders = new Headers(request.headers);
  const sessionToken = request.cookies.get('sessionToken')?.value;
  if (sessionToken) {
    requestHeaders.set('x-sessionToken-to-delete', sessionToken);
  }
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  // delete the cookie from the browser
  response.cookies.set({
    name: 'sessionToken',
    maxAge: -1,
  });
  return response;
}
