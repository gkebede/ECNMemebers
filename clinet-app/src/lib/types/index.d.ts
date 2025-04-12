export type Member = {
    id: string
    firstName: string
    userName: string
    displayName: string
    bio: string
    lastName: string
    email: string
    phoneNumber: string
    isActive: boolean
    isAdmin: boolean
   
    addresses: Address[]
    familyMembers: FamilyMember[]
    memberFiles: MemberFile[]
    payments: Payment[]
    incidents: Incident[]
  }
  
  export type Address ={
    id: string
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  
  export type FamilyMember ={
    id: string
    firstName: string
    middleName: string
    lastName: string
    relationship: string
  }
  
  export type MemberFile= {
    id: string
    fileName: string
    filePath: string
    fileDescription: string
  }
  
  export type Payment= {
    id: string
    paymentAmount: number
    paymentDate: string
    paymentType: string
    paymentRecurringType: string
  }
  
  export type Incident = {
    id: string
    incidentType: string
    incidentDescription: string
    incidentDate: string
    eventNumber: number
  }
  