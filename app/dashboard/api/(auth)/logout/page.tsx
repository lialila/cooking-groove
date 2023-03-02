import { redirect } from 'next/navigation';

import { deleteSessionByToken } from ;

// 1 send a cookie deletion task for the browser
// used a middleware for that

export default function LogoutPage() {

  // 2 get the session token from the cookie
const sessionToken = headers().get("x-sessionToken-to-delete");
  // 3 delete the session that matches that token
id (sessionToken) {
  await deleteSessionByToken(sessionToken)
}
  return redirect('/');
}
