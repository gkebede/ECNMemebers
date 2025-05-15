import { useStore } from "../../../app/stores/store";
import { Member } from "../../../lib/types";
import MemberForm from "./MemberForm";
//import ObservedMemberForm from "./MemberForm";

export function MemberFormWrapper() {
    
    const { memberStore } = useStore();
    const handleSubmit = async (member: Member) => {
      if (memberStore.editMode) {
        await memberStore.updateMember(member);
      } else {
        await memberStore.createMember(member);
      }
    };
    return <MemberForm onSubmit={handleSubmit} />;
  }
  