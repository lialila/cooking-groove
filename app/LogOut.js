'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LogOut() {
  const router = useRouter();

  return (
    <Link href="/logout" prefetch={false} onClick={router.refresh()}>
      Log out
    </Link>
  );
}
