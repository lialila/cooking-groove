// import { Inter } from 'next/font/google';
import Link from 'next/link';
import Form from './Form';

export const metadata = {
  title: {
    default: 'Create new account',
  },
};

export default function SignUpPage() {
  return (
    <div>
      <h2>Cooking Groove</h2>
      <Form />
      <button>
        <Link href="/">Back</Link>
      </button>
    </div>
  );
}
