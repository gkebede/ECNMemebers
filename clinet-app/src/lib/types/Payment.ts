export type Payment = {
    paymentAmount: number; // Use number for double in TypeScript
    paymentDate: Date;
    paymentType: string;
    memberId: string;
}