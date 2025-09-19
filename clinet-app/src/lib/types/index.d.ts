export type Result<T> = {
  memberFiles: never[];
  isSuccess: boolean;
  value?: T;
  error?: string;
};

export type MemberFileDto = {
  id: string;
  fileName: string;
  filePath: string;
  fileDescription?: string;
  contentType: string;
}


export type Member = {
id?: string;
    firstName: string
    lastName: string
    email: string
    registerDate: string
    phoneNumber: string
    isActive: boolean
    isAdmin: boolean

    userName?: string
    displayName?: string
    bio?: string

    addresses?: Address[]
    familyMembers?: FamilyMember[]
    memberFiles?: MemberFile[]
    payments?: Payment[]
    incidents?: Incident[]
  }

  export type File ={
   
                FileName?: string,
                FileDescription?: string,
                FilePath?: string,
                ContentType?: string,
  }

// export type Member = {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
//   phoneNumber: string
//   registerDate: string
//   isActive: boolean
//   isAdmin: boolean
//   bio?: string;
// }

export type Address = {
  id: string
  street: string
  city: string
  state: string
  country: string
  zipCode: string
}
export type Incident = {
  id: string
  incidentType: string
  incidentDescription: string
  paymentDate: string
  incidentDate: string
  eventNumber: string

}

export type FamilyMember = {
  id: string
  memberFamilyFirstName: string
  memberFamilyMiddleName: string
  memberFamilyLastName: string
  relationship: string
}

export type MemberFile = {
  id: string
  fileName: string
  filePath: string
  fileDescription: string
}


export const paymentMethods: string[] = [
  'Cash',
  'CreditCard',
  'Check',
  'Recipt-Attached',
  'BankTransfer',
];


export const paymentRecurringType: string[] = [
  'Annual',
  'Monthly',
  'Quarterly',
  'Incident',
'Membership',
'Mislaneous'
];
export type Payment = {
  id: string
  paymentAmount: number
  paymentDate: string
  paymentType: string
  paymentRecurringType: string
}

export type Incident = {
  id: string
  incidentDate: string
  paymentDate: string
  eventNumber: number
}
