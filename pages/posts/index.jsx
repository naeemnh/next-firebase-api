import Link from 'next/link'
import db from '../../utils/db';

const Posts = ({entriesData}) => {

  return (
    <div>
      <h1>Posts</h1>
      {entriesData.map(entry => (
        <div key={entry.id}>
          <Link href={`/posts/${entry.slug}`}>
            {entry.title}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const entries = await db.collection('entries').orderBy('createdAt').get();
  const entriesData = entries.docs.map(entry => ({
    id: entry.id,
    ...entry.data()
  }));
  return {
    props: { entriesData },
    revalidate: 10
  }
}

export default Posts;