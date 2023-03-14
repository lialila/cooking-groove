import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getCommentsByGrooveId } from '../../../../database/comments';
import { getGrooveById, getGrooves } from '../../../../database/grooves';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUserBySessionToken } from '../../../../database/users';
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
    description: `{singleGroove.name}`,
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

  const userId = user?.id;

  const singleGroove = await getGrooveById(parseInt(props.params.grooveId));

  if (!singleGroove) {
    notFound();
  }
  const grooves = await getGrooves();

  const comments = await getCommentsByGrooveId(parseInt(props.params.grooveId));
  const usersParticipating = await getUsersgroovesByGrooveId(
    parseInt(props.params.grooveId),
  );
  console.log('usersParticipating: ', usersParticipating);
  return (
    <section>
      <EditGrooveForm
        singleGroove={singleGroove}
        userId={userId}
        grooves={grooves}
        comments={comments}
        usersParticipating={usersParticipating}
      />
    </section>
  );
}
