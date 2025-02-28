import { Address } from './Address'; // Adjust the import path as necessary
import {MemberFile} from './MemberFile';
import { FamilyMember } from './FamilyMember ';
import { Incident } from './Incident';
import { Payment } from './Payment'

export type Member = {
    id: string;
    firstName: string;
    lastName: string;
    registerDate: Date;
    addresses: Address[];
    familyMembers: FamilyMember[];
    memberFiles: MemberFile[];
    payments: Payment[];
    incidents: Incident[];
}

