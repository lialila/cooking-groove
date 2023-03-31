'use client';
import { User } from '../../../../../database/users';
import styles from './page.module.scss';

type Props = {
  params: {
    userId: number;
  };
  users: User[];
};

export default function Chat({ params }: Props) {
  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
}
