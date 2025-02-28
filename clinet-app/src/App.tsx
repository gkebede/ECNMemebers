import { useEffect, useState } from 'react'
import { Member } from './lib/types/member';
import { List, ListItem, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [memebers, setMemebes] = useState<Member[]>([]);

  useEffect(() => {
    axios<Member[]>("https://localhost:5001/api/Members").then(response =>
       setMemebes(response.data))
  }, []);

  

  return (
    <>
     <Typography variant='h3'>ECN Members</Typography>
        <List>
          {memebers.map((memeber) =>(
            <ListItem key={memeber.id}>{memeber.firstName}</ListItem>
          ))}
        </List>
     </>
  )
}

export default App
