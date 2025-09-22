import * as React from 'react';
import { useState } from 'react';
import {
  Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer,
  Paper, Button, Container, TableHead, TableRow, Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  TablePagination,
  Chip
} from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import { Member } from '../src/lib/types';
import { observer } from "mobx-react-lite";
import { SpaRounded } from '@mui/icons-material';

type Props = {
  members: Member[]
};

const MemberList = function ({ members }: Props) {
  const [openMemberId, setOpenMemberId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // --- Helpers ---
  const toggleOpen = (id: string) => setOpenMemberId(prev => (prev === id ? null : id));
  const handleDetailsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const memberId = event.currentTarget.getAttribute('data-member-id');
    if (memberId) navigate(`/card/${memberId}`);
  };
  const handleNavigateHome = () => members.length > 0 && navigate(`/home`);
  const handleSearchMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMember(event.target.value.toLowerCase());
    setPage(0);
  };
  const handleChangePage = (_: any, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatSafeDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return !isNaN(d.getTime()) ? format(d, 'dd MMM yyyy') : 'N/A';
  };

  const formatCurrency = (amount: number | undefined) => {
    if (amount == null) return 'N/A';
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  // --- Filter and paginate ---
  const searchedMembers = members.filter(member =>
    member.firstName.toLowerCase().includes(selectedMember) ||
    member.lastName.toLowerCase().includes(selectedMember) ||
    member.email.toLowerCase().includes(selectedMember) ||
    member.phoneNumber.toLowerCase().includes(selectedMember)
  );

  const paginatedMembers = searchedMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth='xl' sx={{ m: 'auto', justifyContent: 'space-between' }}>
      {!members.length ? (
        <Box sx={{ mt: 22, borderRadius: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh', p: 2 }}>
          <CircularProgress style={{ color: 'green', width: 100, height: 100 }} />
          <Box sx={{ fontSize: '2rem', ml: 2, fontWeight: 700 }}>Loading...</Box>
        </Box>
      ) : (
        <>
          <Typography sx={{ textAlign: 'center', fontWeight: 700, mb: 2, fontSize: '2rem' }}>Members' List</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
            <TextField
              label="Search by name, email, or phone number"
              variant="outlined"
              size="small"
              sx={{ width: '45ch' }}
              value={selectedMember}
              onChange={handleSearchMember}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <PageviewIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {searchedMembers.length === 0 ? (
            <Box sx={{ textAlign: 'center', fontWeight: 700, mb: 2, fontSize: '1.5rem', borderRadius: '1rem', p: 2 }}>
              <Chip
                icon={<SpaRounded sx={{ fontSize: '2rem', color: '#006663' }} />}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 0.2 }}>
                    <Box sx={{ backgroundColor: '#fd0101', fontSize: '1.5rem', color: 'white', padding: '1rem', borderRadius: '0.5rem', fontWeight: 700, mb: 1 }}>Sorry</Box>
                    <Box sx={{ backgroundColor: '#f0f0f0', color: '#000', padding: '1rem .5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>
                      We do not have a member called: {selectedMember.toUpperCase()}
                    </Box>
                  </Box>
                }
                sx={{ m: 3, backgroundColor: '#fd0101', padding: 2.5, fontSize: '1rem', fontWeight: 700, color: 'white', wordBreak: 'break-word' }}
              />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ maxWidth: '100%', margin: 'auto', borderRadius: '1rem' }}>
              <Table aria-label="collapsible table">
                <TableHead sx={{ backgroundColor: 'lightblue' }}>
                  <TableRow>
                    <TableCell />
                    <TableCell>First Name</TableCell>
                    <TableCell>Middle Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Bio</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone number</TableCell>
                    <TableCell>View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedMembers.map((member, index) => (
                    <React.Fragment key={member.id}>
                      <TableRow sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
                        <TableCell>
                          <IconButton size="small" onClick={() => toggleOpen(member.id ?? '')}>
                            {openMemberId === member.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell>{member.firstName}</TableCell>
                        <TableCell>{member.middleName}</TableCell>
                        <TableCell>{member.lastName}</TableCell>
                        <TableCell>{member.bio}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phoneNumber}</TableCell>
                        <TableCell>
                          <Button onClick={handleDetailsClick} data-member-id={member.id} variant="contained" color="secondary">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                          <Collapse in={openMemberId === member.id} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              <Typography variant="h5" gutterBottom>Payment Details</Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Number of Event</TableCell>
                                    <TableCell>Payment Amount</TableCell>
                                    <TableCell>Date of Payment</TableCell>
                                    <TableCell>Payment Slips</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>
                                      {member.incidents?.length ? member.incidents.map((incident, i) => <div key={i}>{incident.eventNumber}</div>) : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {member.payments?.length ? member.payments.map((payment, i) => <div key={i}>{formatCurrency(payment.paymentAmount)}</div>) : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {member.payments?.length ? member.payments.map((payment, i) => <div key={i}>{formatSafeDate(payment.paymentDate)}</div>) : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {member.memberFiles?.length ? member.memberFiles.map((file, i) => (
                                        <div key={i}>
                                          <RouterLink to={`recipts/${file.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                            {file.fileName || 'Receipt'}
                                          </RouterLink>
                                        </div>
                                      )) : "N/A"}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>

              <Box>
                <Button variant="contained" color="primary" onClick={handleNavigateHome}
                  sx={{ width: '15%', letterSpacing: '5px', mb: 2, mt: 2, ml: 2, fontSize: '1.5rem', backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#115293' } }}>
                  Home
                </Button>

                <TablePagination
                  sx={{ display: 'flex', float: 'right', mb: 2, mt: 2, ml: 2, fontSize: '1.5rem' }}
                  component="div"
                  count={searchedMembers.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage="Rows per page"
                />
              </Box>
            </TableContainer>
          )}
        </>
      )}
    </Container>
  );
}

const ObservedMemberList = observer(MemberList);
export default ObservedMemberList;
