import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MemberCard from './MemberCard';
 
import { useStore } from '../../../app/stores/store';

 
const DetailDisplay = () => {

  const { id } = useParams<{ id: string }>();
  const { memberStore } = useStore();
  
  const member = memberStore.members.find(m => m.id === id);
 
  if (!memberStore.members) return <div>Loading...</div>;

  return (
    <>
    { 
      !member? <div>Loading...</div> : (
        <div>
         {member && <MemberCard member={member} />}
        </div>
      )
    }
    </>
   
  );
};

const ObservedDetailDisplay = observer(DetailDisplay);
export default ObservedDetailDisplay;
 







// import { Box } from "@mui/material"
// import { Member } from "../../../lib/types"
// import MemeberCard from "./MemberCard"

// type Props = {
//   members: Member[]
// }
// export default function DetailDisplay({ members }: Props) {

//   return (
//     <>
//       <Box sx={{ display: 'flex', msFlexDirection: 'column', gap: 3 }}>

//         {members.map(member => (
//           <MemeberCard member={member} />
//         ))

//         }
//       </Box>
//     </>

//   )
// }
