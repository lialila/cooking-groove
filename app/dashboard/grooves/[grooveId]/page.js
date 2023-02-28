import { getGroove } from '../../../../database/grooves';

export const dynamic = 'force-dynamic';


export async function generateMetadata(props) {
  //   const singleItem = await getItem(props.params.itemId)
  //   return {
  //   title: `${singleItem.name}`
  //       },
  //
  return {
    title: 'Groove',
  };
}

export default async function GroovePage({params}) {

  // const singleGroove = grooves.find((groove)=> {
  //   return groove.id ===getJSDocParameterTags.grooveId;
  // })
  const singleGroove = await getGroove({params.grooveId})

  if (!singleGroove) {
    throw new Error('This action is not allowed');
    // notFound();
  }
  return <Groove groove={singleGroove} />;
}
