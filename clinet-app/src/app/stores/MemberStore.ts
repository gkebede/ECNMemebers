import { makeAutoObservable, runInAction } from "mobx";
import { Member } from "../../lib/types";
import agent from "../../lib/api/agent";

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
              this.setLoadingInitial(true);
              try {
                const response = await agent.Members.list();
                const members = Array.isArray(response) ? response : response.value ?? [];

                runInAction(() => {
                  this.members = members;
                  this.memberRegistry.clear();
                  members.forEach(member => {
                    if (member.id) {
                      this.memberRegistry.set(member.id, member);
                    }
                  });
                  this.setLoadingInitial(false);
                });
              } catch (error) {
                console.error("Error loading members:", error);
                runInAction(() => this.setLoadingInitial(false));
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
