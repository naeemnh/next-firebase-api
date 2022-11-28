import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const List = () => {
  const [entries, setEntires] = useState([]);

  useEffect(() => {
    async () => {
      const res = await axios('/api/entries');
      setEntires(res.data.entriesData);
    }
  }, [])

  return (
    <div>
      <h1>Entries</h1>
      {entries.map(entry => (
        <div key={entry.id}>
          <Link href={`/admin/edit/${entry.id}`}>
            <a>{entry.title}</a>
          </Link>
          <br/>
        </div>
      ))}
    </div>
  );
}

export default List;