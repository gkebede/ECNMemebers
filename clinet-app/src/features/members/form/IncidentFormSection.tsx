import { Box, TextField, Button, IconButton, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { Incident } from '../../../lib/types';
import {formatToInputDate} from '../../../utils/dateUtils';
 

type Props = {
  incidents: Incident[];
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
};

export default function IncidentFormSection({ incidents, setIncidents }: Props) {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated: Incident[] = [...incidents];
    updated[index] = { ...updated[index], [name]: value };
    setIncidents(updated);
  };



  const handleAdd = () => {
    setIncidents([
      ...incidents,
      { id: uuidv4(), incidentDate: '', paymentDate: '', eventNumber: '0', incidentType: '', incidentDescription: '' }
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = [...incidents];
    updated.splice(index, 1);
    setIncidents(updated);
  };



  return (

    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>

 
      <Box mt={3}>
        <Typography variant="h6">Incident</Typography>
        {incidents.map((incident, index) => (
          <Box
            key={incident.id}
            display="grid"
            gridTemplateColumns="repeat(5, 1fr)"
            gap={2}
            alignItems="center"
            mt={2}
          >
            <TextField
              label=""
              type="date"
              name="paymentDate"
              
              value={incident.paymentDate}
              onChange={(e) => handleChange(index, e)}
            />

        

            <TextField
              label="Event Number"
              name="eventNumber"
              type="number"
               value={incident.eventNumber}
      
              onChange={(e) => handleChange(index, e)}
            />

            <Box />
            <IconButton onClick={() => handleRemove(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={handleAdd} sx={{ mt: 2 }} variant="outlined">
          Number of Events
        </Button>
      </Box>
    </Paper>
  );
}
