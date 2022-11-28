import {useRouter} from 'next/router';

import { getLog } from '../../utils/log';
import db from '../../utils/db';

const Post = ({entry}) => {
  console.log(entry)

  const onDelete = () => {
    getLog(entry)
  }

  const router = useRouter();
  if (router.isFallback)
    return <div>Loading</div>
  if (!entry)
    return <div>not found</div>
  return (
    <div>
      <h1>{entry.title}</h1>
      <h4>{entry.createdAt}</h4>
      <p>{entry.body}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export const getStaticPaths = async () => {
  const entries = await db.collection('entries').get()
  const paths = entries.docs.map(entry => ({
    params: {
      slug: entry.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async context => {
  const {slug: slug} = context.params;
  // const response = await db.doc('')
  const res = await db.collection('entries').where('slug', '==', slug).get();
  const entry = res.docs.map(entry => ({id: entry.id, ...entry.data()}));
  getLog(res)
  if(entry.length)
    return {
      props: {
        entry: entry[0]
      }
    }
  else
    return {
      props: {}
    }
}

export default Post;