export type Incident ={
    id: number;
    incidentType: string; // Assuming IncidentType is converted to string
    incidentDescription: string;
    incidentDate: Date;
    memberId: string;
}