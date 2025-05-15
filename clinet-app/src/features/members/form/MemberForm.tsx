import {
  Box, Button, Checkbox, CircularProgress,
  Container, FormControlLabel, Paper,
  TextField, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../../app/stores/store';
import agent from '../../../app/api/agent';

import {
  Member, Address, FamilyMember, Payment, Incident, MemberFile
} from '../../../lib/types';

import AddressFormSection from './AddressFormSection';
import FamilyMemberFormSection from './FamilyMemberFormSection';
import PaymentFormSection from './PaymentFormSection';
import IncidentFormSection from './IncidentFormSection';
import MemberFileFormSection from './MemberFileFormSection';

// Put this outside the component
const defaultMember: Member = {
  firstName: '',
  lastName: '',
  email: '',
  registerDate: '',
  phoneNumber: '',
  isActive: false,
  isAdmin: false,
  addresses: [],
  familyMembers: [],
  payments: [],
  incidents: [],
  memberFiles: [],
};


function MemberForm() {
  const { memberStore } = useStore();
  const { selectedMember, editMode, setEditMode, loadMember } = memberStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [member, setMember] = useState<Member>(defaultMember);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [memberFiles, setMemberFiles] = useState<MemberFile[]>([]);

  const isBaseInfoFilled = member.firstName && member.lastName && member.email && member.phoneNumber;

  useEffect(() => {
    if (id) {
      setEditMode(true);
      loadMember(id);
    } else {
      setEditMode(false);
      resetForm();
    }
  }, [id, setEditMode, loadMember]);

useEffect(() => {
  if (editMode && selectedMember && selectedMember.id === id) {
    setMember({
      ...selectedMember,
      registerDate: selectedMember.registerDate
        ? new Date(selectedMember.registerDate).toISOString().split('T')[0]
        : '',
    });

    setAddresses(selectedMember.addresses ?? []);
    setFamilyMembers(selectedMember.familyMembers ?? []);
    setPayments(selectedMember.payments ?? []);
    setIncidents(selectedMember.incidents ?? []);
    setMemberFiles(selectedMember.memberFiles ?? []);
  } else {
    // Reset all form state when switching to create mode
    setMember(defaultMember);
    setAddresses([]);
    setFamilyMembers([]);
    setPayments([]);
    setIncidents([]);
    setMemberFiles([]);
  }
}, [selectedMember, editMode, id]);


  const resetForm = () => {
    setMember(defaultMember);
    setAddresses([]);
    setFamilyMembers([]);
    setPayments([]);
    setIncidents([]);
    setMemberFiles([]);
  };

  const handleCancel = () => navigate('/memberList');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedMember: Member = {
      ...member,
      addresses,
      familyMembers,
      payments,
      incidents,
      memberFiles
    };

    const action = editMode ? agent.Members.update : agent.Members.create;

    action(updatedMember)
      .then(() => {
        console.log(`Member ${editMode ? 'updated' : 'created'} successfully.`);
        navigate('/memberList');
      })
      .catch(error => console.error(`Error ${editMode ? 'updating' : 'creating'} member:`, error));
  };

  if (editMode && (!selectedMember || selectedMember.id !== id)) {
    return (
      <Box sx={{ mt: 22, borderRadius: '2rem', fontSize: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh', p: 2 }}>
        <CircularProgress style={{ color: 'green', width: 100, height: 100 }} />
        <Box sx={{ fontSize: '2rem', ml: 2, fontWeight: 700 }}>Loading Members...</Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ padding: '.1px', backgroundColor: '#f5f5f5' }}>
      <form onSubmit={handleSubmit}>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 2, borderRadius: 3, margin: '3rem auto' }}>
          <Typography variant="h4" gutterBottom color="primary">
            {editMode ? 'Editing Member Form' : 'Member Registration Form'}
          </Typography>

          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
            <TextField label="First Name" value={member.firstName} onChange={(e) => setMember({ ...member, firstName: e.target.value })} />
            <TextField label="Last Name" value={member.lastName} onChange={(e) => setMember({ ...member, lastName: e.target.value })} />
            <TextField label="Email" value={member.email} onChange={(e) => setMember({ ...member, email: e.target.value })} />
            <TextField label="Phone Number" value={member.phoneNumber} onChange={(e) => setMember({ ...member, phoneNumber: e.target.value })} />
            <FormControlLabel control={<Checkbox checked={member.isActive} onChange={(e) => setMember({ ...member, isActive: e.target.checked })} />} label="Is Active" />
            <FormControlLabel control={<Checkbox checked={member.isAdmin} onChange={(e) => setMember({ ...member, isAdmin: e.target.checked })} />} label="Is Admin" />
            <TextField label="Register Date" type="date" value={member.registerDate} onChange={(e) => setMember({ ...member, registerDate: e.target.value })} InputLabelProps={{ shrink: true }} />
          </Box>

          {isBaseInfoFilled && (
            <>
              <AddressFormSection addresses={addresses} setAddresses={setAddresses} />
              <FamilyMemberFormSection familymembers={familyMembers} setFamilyMembers={setFamilyMembers} />
              <PaymentFormSection payments={payments} setPayments={setPayments} />
              <IncidentFormSection incidents={incidents} setIncidents={setIncidents} />
              <MemberFileFormSection memberFiles={memberFiles} setMemberFiles={setMemberFiles} />
            </>
          )}

          <Box display="flex" justifyContent="end" gap={3} mt={3}>
            <Button onClick={handleCancel} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={!isBaseInfoFilled}>
              {editMode ? 'Update Member' : 'Create Member'}
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
  );
}

const ObservedMemberForm = observer(MemberForm);
export default ObservedMemberForm;
