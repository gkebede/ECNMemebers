import React from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit'; // Optional
import { v4 as uuidv4 } from 'uuid';
import { FamilyMember } from '../../../lib/types';

// type FamilyMember = {
//   id: string;
//   memberFamilyFirstName: string;
//   memberFamilyLastName: string;
//   memberFamilyMiddleName: string;
//   relationship: string;
// };

type Props = {
  familymembers: FamilyMember[];
  setFamilyMembers: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
};

export default function FamilyMemberFormSection({
  familymembers,
  setFamilyMembers
}: Props) {
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updated = [...familymembers];
    updated[index] = { ...updated[index], [name]: value };
    setFamilyMembers(updated);
  };

  const handleAdd = () => {
    setFamilyMembers([
      ...familymembers,
      {
        id: uuidv4(),
        memberFamilyFirstName: '',
        memberFamilyMiddleName: '',
        memberFamilyLastName: '',
        relationship: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = [...familymembers];
    updated.splice(index, 1);
    setFamilyMembers(updated);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Box mt={3}>
        <Typography variant="h6">Family Members</Typography>
        {familymembers.map((family, index) => (
          <Box
            key={family.id}
            display="grid"
            gridTemplateColumns="repeat(6, 1fr)"
            gap={2}
            alignItems="center"
            mt={2}
          >
            <TextField
              label="First Name"
              name="memberFamilyFirstName"
              value={family.memberFamilyFirstName}
              onChange={(e) => handleChange(index, e)}
            />
            <TextField
              label="Middle Name"
              name="memberFamilyMiddleName"
              value={family.memberFamilyMiddleName}
              onChange={(e) => handleChange(index, e)}
            />
            <TextField
              label="Last Name"
              name="memberFamilyLastName"
              value={family.memberFamilyLastName}
              onChange={(e) => handleChange(index, e)}
            />
            <TextField
              label="Relationship"
              name="relationship"
              value={family.relationship}
              onChange={(e) => handleChange(index, e)}
            />
            <Box />
            <Box display="flex" justifyContent="end" gap={1}>
              <IconButton onClick={() => handleRemove(index)}>
                <DeleteIcon />
              </IconButton>
              {/* Uncomment and implement edit functionality if needed
              <IconButton onClick={() => handleEdit(index)}>
                <EditIcon />
              </IconButton>
              */}
            </Box>
          </Box>
        ))}
        <Button onClick={handleAdd} sx={{ mt: 2 }} variant="outlined">
          Add Family Member
        </Button>
      </Box>
    </Paper>
  );
}
