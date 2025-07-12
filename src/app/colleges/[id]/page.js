// app/[id]/page.js
import DetailPage from './DetailPage';

export default async function  CollegePage({ params }) {
  const { id } = await params;
  console.log(id)
  return <DetailPage id={id} />;
}
