import { useEffect, useState } from 'react'
import { Member } from './lib/types';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const[members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
     
     axios.get<Member[]>("https://localhost:5001/api/members")
     
     .then(ressponse => setMembers(ressponse.data))
 
     //return() => {} //this is clean up code
    
  },[]);
   
  return (
    <>
     <Typography variant='h3'  style={{color:'#fd0101'}}>Hello Members</Typography >

     <List>
       {members.map((element) => ( //element.isActive &&
         
        <ListItem key={element.id}><ListItemText>{element.firstName} {element.lastName} {element.isActive}</ListItemText></ListItem>
       ))}
     </List>
    </>
  )
}

export default App
