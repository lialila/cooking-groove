import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getGrooveById, getGrooves } from '../../../../database/grooves';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUserBySessionToken } from '../../../../database/users';
import EditGrooveForm from './EditGrooveFrom';
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
  // const sessionTokenCookie = cookies().get('sessionToken');

  // const session =
  //   sessionTokenCookie &&
  //   (await getValidSessionByToken(sessionTokenCookie.value));

  // if (!session) {
  //   redirect('/dashboard/login');
  // }
  const singleGroove = await getGrooveById(parseInt(props.params.grooveId));

  if (!singleGroove) {
    notFound();
  }
  const grooves = await getGrooves();

  return (
    <section>
      <EditGrooveForm
        singleGroove={singleGroove}
        userId={userId}
        grooves={grooves}
      />
    </section>
  );
}
