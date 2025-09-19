import {
  Box, Button, Checkbox, CircularProgress,
  Container, FormControlLabel, Paper,
  TextField, Typography
} from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../../app/stores/store';
import agent from '../../../lib/api/agent';
import {
  Member, Address, FamilyMember, Payment, Incident, MemberFile,
 
} from '../../../lib/types';

import AddressFormSection from './AddressFormSection';
import FamilyMemberFormSection from './FamilyMemberFormSection';
import PaymentFormSection from './PaymentFormSection';
import IncidentFormSection from './IncidentFormSection';

const defaultMember: Member = {
  id: '',
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
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isBaseInfoFilled = !!(member.firstName && member.lastName && member.email && member.phoneNumber);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      loadMember(id);
    } else {
      setEditMode(false);
      resetForm();
    }
  }, [id, loadMember, setEditMode]);

  useEffect(() => {
    if (editMode && selectedMember && selectedMember.id === id) {
      const formattedDate = selectedMember.registerDate
        ? new Date(selectedMember.registerDate).toISOString().split('T')[0]
        : '';

      setMember({ ...selectedMember, registerDate: formattedDate });
      setAddresses(selectedMember.addresses ?? []);
      setFamilyMembers(selectedMember.familyMembers ?? []);
      setPayments(selectedMember.payments ?? []);
      setIncidents(selectedMember.incidents ?? []);
      setMemberFiles(selectedMember.memberFiles ?? []);
    } else {
      resetForm();
    }
  }, [editMode, selectedMember, id]);

  const resetForm = () => {
    setMember(defaultMember);
    setAddresses([]);
    setFamilyMembers([]);
    setPayments([]);
    setIncidents([]);
    setMemberFiles([]);
    setFiles([]);
  };

  const handleInputChange = (
    key: keyof Member,
    value: string | boolean,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setMember(prev => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    resetForm();
    navigate('/memberList');
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const updatedMember: Member = {
    ...member,
    addresses,
    familyMembers,
    payments,
    incidents,
    memberFiles
  };

  try {
    let memberId = member.id;

    if (editMode) {
      await agent.Members.update(updatedMember);
    } else {
      const result = await agent.Members.create(updatedMember);
      if (!result.isSuccess || !result.value) {
        console.error("Failed to create member");
        return;
      }

      memberId = result.value;
    }

    // Upload files if any
    if (files.length > 0 && memberId) {
      await agent.uploads(memberId, files, "Uploaded during member form submission");
      const refreshed = await agent.Members.details(memberId);
      setMemberFiles(refreshed.memberFiles ?? []);
    }

    navigate('/memberList');
  } catch (error) {
    console.error(`Error ${editMode ? 'updating' : 'creating'} member:`, error);
  }
};


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(prev => [...prev, ...Array.from(fileList)]);
    }
  };

  const handleUpload = async () => {
    if (!files.length || !member.id) return;

    try {
      await agent.uploads(member.id, files, "Manual file upload");
      const refreshed = await agent.Members.details(member.id);
      setMemberFiles(refreshed.memberFiles ?? []);
      setFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  if (editMode && (!selectedMember || selectedMember.id !== id)) {
    return (
      <Box sx={{ mt: 22, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
        <CircularProgress style={{ color: 'green', width: 100, height: 100 }} />
        <Box sx={{ fontSize: '2rem', ml: 2, fontWeight: 700 }}>Loading Member...</Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#f5f5f5', padding: '.1px' }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Paper elevation={3} sx={{ p: 3, mb: 2, borderRadius: 3, mt: 6 }}>
          <Typography variant="h4" gutterBottom color="primary">
            {editMode ? 'Edit Member' : 'Register New Member'}
          </Typography>

          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
            <TextField label="First Name" value={member.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value, e)} />

            <TextField label="Last Name" value={member.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value, e)} />

            <TextField label="Email" value={member.email}
              onChange={(e) => handleInputChange('email', e.target.value, e)} />

            <TextField label="Phone Number" value={member.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value, e)} />

            <FormControlLabel control={
              <Checkbox checked={member.isActive}
                onChange={(e) => setMember(prev => ({ ...prev, isActive: e.target.checked }))} />
            } label="Is Active" />

            <FormControlLabel control={
              <Checkbox checked={member.isAdmin}
                onChange={(e) => setMember(prev => ({ ...prev, isAdmin: e.target.checked }))} />
            } label="Is Admin" />

            <TextField label="Register Date" type="date"
              value={member.registerDate}
              onChange={(e) => setMember(prev => ({ ...prev, registerDate: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {isBaseInfoFilled && (
            <>
              <AddressFormSection addresses={addresses} setAddresses={setAddresses} />
              <FamilyMemberFormSection familymembers={familyMembers} setFamilyMembers={setFamilyMembers} />
              <PaymentFormSection payments={payments} setPayments={setPayments} />
              <IncidentFormSection incidents={incidents} setIncidents={setIncidents} />

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <Box mt={2}>
                <Button variant="contained" onClick={() => fileInputRef.current?.click()}>
                  Select Files
                </Button>
              </Box>

              {files.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Selected Files:</Typography>
                  {files.map((file, index) => (
                    <Typography key={index} variant="body2">{file.name}</Typography>
                  ))}
                </Box>
              )}

              <Box mt={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleUpload}
                  disabled={files.length === 0 || !member.id}
                >
                  Upload Selected Files
                </Button>
              </Box>

              {/* Uploaded File List */}
              {memberFiles.length > 0 && (
                <Box mt={3}>
                  <Typography variant="h6" gutterBottom>Uploaded Files</Typography>
                  {memberFiles.map((file, idx) => (
                    <Box key={idx} display="flex" alignItems="center" gap={2} mb={1}>
                      <Typography variant="body2">{file.fileName}</Typography>
                      <a
                        href={`/uploads/${file.fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        Download
                      </a>
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button onClick={handleCancel} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={!isBaseInfoFilled}>
              {editMode ? 'Update Member' : 'Create Member'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

const ObservedMemberForm = observer(MemberForm);
export default ObservedMemberForm;
