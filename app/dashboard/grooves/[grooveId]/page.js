import {
  Alternates,
  Courier_Prime,
  Inter,
  Montserrat,
} from '@next/font/google';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGrooveById } from '../../../../database/grooves';
import EditGrooveForm from './EditGrooveFrom';
import { grooveNotFoundMetadata } from './not-found';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

// export async function generateMetadata(props: Props): Promise<Metadata> {
//   const groove = await getGrooveById(parseInt(props.params.grooveId));

//   if (!groove) {
//     return grooveNotFoundMetadata;
//   }

//   return {
//     title: groove.name,
//     description: `{singleGroove.name}`,
//   };
// }
// type Props = {
//   params: {
//     grooveId: string;
//   };
// };

export default async function GrooveIdPage(props) {
  const singleGroove = await getGrooveById(parseInt(props.params.grooveId));

  if (!singleGroove) {
    notFound();
  }

  return (
    <section>
      <EditGrooveForm groove={singleGroove} />
    </section>
  );
}
