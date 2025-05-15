import { makeAutoObservable, runInAction } from "mobx";
import { Member } from "../../lib/types";
import agent from "../api/agent";

 class MemberStore {
    members: Member[] = [];
    member: Member | undefined = undefined;

    memberRegistry = new Map<string, Member>();
    selectedMember: Member | undefined = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

 

    
    public loadAllMembers = async () => {
      try {
          const members = await agent.Members.list();
          runInAction(() => {
              this.members = members;
              this.loadingInitial = false;
         
          members.forEach(member => {
              if (member.id) {
                  this.memberRegistry.set(member.id, member);
              }
          });
        });
      } catch (error) {
          console.log(error);
      }
  };

     
  

    loadMember = async (id?: string) => {
      try {
        if (!id) throw new Error("Member ID is required");
        const response = await agent.Members.details(id);
        runInAction(() => {
          this.selectedMember = response.value!; // directly assign the response
        });
      } catch (error) {
        console.error('Failed to load member:', error);
      }
    }

        async createMember(member: Member) {
          try {
            await agent.Members.create(member);
            runInAction(() => {
              if (member.id) {
                  this.memberRegistry.set(member.id, member);
              }
              this.selectedMember = member;
              this.editMode = false;
              this.loading = false;
            });
          } catch (error) { 
            console.error('Failed to create member:', error);
          }
        }

        async updateMember(member: Member) {
          try {
            await agent.Members.update(member);
            runInAction(() => {
              if (member.id) {
                  this.memberRegistry.set(member.id, member);
              }
              this.selectedMember = member;
              this.editMode = false;
              this.loading = false;
            });
          } catch (error) {
            console.error('Failed to update member:', error);
          }
        }
        async deleteMember(id: string) {
          try {
            await agent.Members.delete(id);
            runInAction(() => {
              this.memberRegistry.delete(id);
              this.selectedMember = undefined;
            });
          } catch (error) {
            console.error('Failed to delete member:', error);
          }
        }

        setSelectedMember = (id: string) => {
          this.selectedMember = this.memberRegistry.get(id);
        };
        setLoadingInitial = (state: boolean) => {   
          this.loadingInitial = state;
        }
        setLoading = (state: boolean) => {  
          this.loading = state;
        }

        setEditMode = (mode: boolean) => {
          this.editMode = mode;
        };

        searchMembers = (query: string) => {
          const trimmedQuery = query.trim().toLowerCase();
          if (!trimmedQuery) return Array.from(this.memberRegistry.values());
        
          return Array.from(this.memberRegistry.values()).filter(member =>
            member.firstName.toLowerCase().includes(trimmedQuery) ||
            member.lastName.toLowerCase().includes(trimmedQuery) ||
            member.email.toLowerCase().includes(trimmedQuery) ||
            member.phoneNumber.toLowerCase().includes(trimmedQuery)
          );
        };
        
 
}

export default MemberStore
