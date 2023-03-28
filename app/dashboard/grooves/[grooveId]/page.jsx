import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getCommentsByGrooveId } from '../../../../database/comments';
import { getGrooveById, getGrooves } from '../../../../database/grooves';
import { getIngredients } from '../../../../database/ingredients';
import {
  getUserById,
  getUserBySessionToken,
  getUsers,
} from '../../../../database/users';
import { getUsersgroovesByGrooveId } from '../../../../database/usersgrooves';
import EditGrooveForm from './EditGrooveForm';
import { grooveNotFoundMetadata } from './not-found';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const groove = await getGrooveById(parseInt(props.params.grooveId));

  if (!groove) {
    return grooveNotFoundMetadata;
  }
  return {
    title: groove.name,
    description: `{currentGroove.name}`,
  };
}

export default async function GrooveIdPage(props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const currentUserId = user?.id;
  if (!currentUserId) {
    return redirect(
      `/dashboard/login?returnTo=/dashboard/grooves/${props.params.grooveId}`,
    );
  }

  if (!user) {
    return redirect(
      `/dashboard/login?returnTo=/dashboard/grooves/${props.params.grooveId}`,
    );
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

  const usersgroovesParticipating = await getUsersgroovesByGrooveId(
    parseInt(props.params.grooveId),
  );

  const ingredients = await getIngredients();

  return (
    <section className={styles.main}>
      <EditGrooveForm
        currentGroove={currentGroove}
        currentUserId={currentUserId}
        currentUser={currentUser}
        grooves={grooves}
        commentsForCurrentGroove={commentsForCurrentGroove}
        usersgroovesParticipating={usersgroovesParticipating}
        users={users}
        ingredients={ingredients}
      />
    </section>
  );
}
