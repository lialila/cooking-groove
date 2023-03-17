import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import {
  deleteCommentById,
  getCommentById,
  getCommentsByGrooveId,
} from '../../../../database/comments';
import { getGrooveById, getGrooves } from '../../../../database/grooves';
import { getValidSessionByToken } from '../../../../database/sessions';
import {
  getUserById,
  getUserBySessionToken,
  getUsers,
} from '../../../../database/users';
import { getUsersgroovesByGrooveId } from '../../../../database/usersgrooves';
import EditGrooveForm from './EditGrooveForm';
import { grooveNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: Props): Promise<Metadata> {
  const groove = await getGrooveById(parseInt(props.params.grooveId));

  if (!groove) {
    return grooveNotFoundMetadata;
  }
  return {
    title: groove.name,
    description: `{currentGroove.name}`,
  };
}

type Props = {
  params: {
    grooveId: string;
    userId: number;
  };
};

export default async function GrooveIdPage(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  console.log('user.id from edit groove page', user?.id);

  const currentUserId = user?.id;

  if (!user) {
    return redirect('/login');
  }
  const users = await getUsers();
  const currentUser = await getUserById(currentUserId);

  const currentGroove = await getGrooveById(parseInt(props.params.grooveId));

  if (!currentGroove) {
    notFound();
  }
  const grooves = await getGrooves();

  const commentsForCurrentGroove = await getCommentsByGrooveId(
    parseInt(props.params.grooveId),
  );
  console.log('props.params.grooveId: ', props.params.grooveId);
  console.log('commentsForCurrentGroove: ', commentsForCurrentGroove);

  const usersgroovesParticipating = await getUsersgroovesByGrooveId(
    parseInt(props.params.grooveId),
  );
  console.log('currentGroove.id from page.tsx: ', currentGroove.id);

  console.log('usersgroovesParticipating: ', usersgroovesParticipating);
  console.log('userId from page.tsx: ', currentUserId);
  return (
    <section>
      <EditGrooveForm
        currentGroove={currentGroove} // current groove
        currentUserId={currentUserId} // current user id
        currentUser={currentUser}
        grooves={grooves}
        commentsForCurrentGroove={commentsForCurrentGroove}
        usersgroovesParticipating={usersgroovesParticipating}
        users={users}
      />
    </section>
  );
}
