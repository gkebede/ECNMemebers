
import MemberList from '../../../../component/MebmerList'
import { Grid2, List, ListItem } from '@mui/material'
// import { Member } from '../../../lib/types';
 import { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

 
const MemberDashboard = observer(() => {

  //const [openMemberId, setOpenMemberId] = useState<string | null>(null);
  const { memberStore } = useStore();
  const { loadAllMembers, members } = memberStore;

  useEffect(() => {
    loadAllMembers(); // only once on mount
  }, [loadAllMembers]);

  console.log("MobX members array:", typeof(members))
  return (
    <Grid2 container>
      <Grid2 size={12}>
        <List>
          <ListItem>
           <MemberList members={members} />
          </ListItem>
        </List>
      </Grid2>
    </Grid2>
  );
});


export default MemberDashboard;



 
 
   
  //  const handdleSelectMember = (id: string)=> {
      
  //    setselectedMember(members.find((member) => member.id === id) ?? null);
  //    if (id) {
  //      setEditMode(true);
  //      //setselectedMember(members.find((member) => member.id === id) ?? null);
  //      navigate(`/card/${id}`);
  
  //    }
  //  };
   
  //  const handdleCancelSelectMember = ()=> {
  //    setselectedMember(null);
  //  };
   
  //  const handleFormOpen = (id?: string)=> {
  //    if (id) {
  //      handdleSelectMember(id);
  //    }else {
  //      handdleCancelSelectMember();
  //      setEditMode(true);
  //    }
  //  };
 
  //  const handleCloseForm = () => {
  //    setEditMode(false);
  //  };

  //const [selectedId, setSelectedId] = useState<string | null>(null);

  // Example: in MemberList, when a member is clicked:
 // onClick={() => setSelectedId(member.id)}
  
