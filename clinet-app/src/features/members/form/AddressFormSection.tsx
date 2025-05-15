import React from 'react';
import { Box, TextField, Button, IconButton, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { Address } from '../../../lib/types';


 
type Props = {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
};

export default function AddressFormSection({ addresses, setAddresses }: Props) {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = [...addresses];
    updated[index] = { ...updated[index], [name]: value };
    setAddresses(updated);
  };

  const handleAdd = () => {
    setAddresses([
      ...addresses,
      { id: uuidv4(), street: '', city: '', state: '', country: '', zipCode: '' }
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = [...addresses];
    updated.splice(index, 1);
    setAddresses(updated);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Box mt={3}>
        <Typography variant="h6">Addresses</Typography>
        {addresses.map((address, index) => (
          <Box
            key={address.id}
            display="grid"
            gridTemplateColumns="repeat(6, 1fr)"
            gap={2}
            alignItems="center"
            mt={2}
          >
            <TextField
              label="Street"
              name="street"
              value={address.street}
              onChange={(e) => handleChange(index, e)}
            />
            <TextField
              label="City"
              name="city"
              value={address.city}
              onChange={(e) => handleChange(index, e)}
            />
            <TextField
              label="State"
              name="state"
              value={address.state}
              onChange={(e) => handleChange(index, e)}
            />
            <TextField
              label="Country"
              name="country"
              value={address.country}
              onChange={(e) => handleChange(index, e)}
            />
            <TextField
              label="Zip Code"
              name="zipCode"
              value={address.zipCode}
              onChange={(e) => handleChange(index, e)}
            />
            <IconButton onClick={() => handleRemove(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={handleAdd} sx={{ mt: 2 }} variant="outlined">
          Add Address
        </Button>
      </Box>
    </Paper>
  );
}
