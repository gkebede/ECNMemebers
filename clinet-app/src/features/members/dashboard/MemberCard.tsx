import {
  Box, Button, Card, CardActions, CardContent, CardHeader,
  Chip, Grid2, Table, TableBody, TableCell,
  TableHead, TableRow, Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Member } from "../../../lib/types";
import SideDrawer from "../../../../component/SideDrawer";
import { format } from "date-fns";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";

type Props = {
  member: Member;
};

export default function MemberCard({ member }: Props) {
  const navigate = useNavigate();
    const store = useStore();
      const { memberStore } = store;
      const { loadMember, setEditMode } = memberStore;

    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
      if (member?.id) {
        setEditMode(true);
         loadMember(member?.id); // This action sets selectedMember internally
      } else {
        memberStore.setEditMode(false);
      }
    }, [id, loadMember, member?.id, memberStore, setEditMode]);
    

  const handleView = () => {
    navigate("/home");
  };

 

    const handleDetailsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const memberId = event.currentTarget.getAttribute('data-member-id');
      if (memberId) {
       
        navigate(`/edit/${memberId}`);
      }
    };

  return (
    <>
    <Grid2 container justifyContent="center" mt={10}>
      <Grid2 >
        <Card sx={{ borderRadius: 3, backgroundColor: '#f5f5f5' }}>
          <CardHeader
            title={
              <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
                {member.firstName} {member.lastName}
              </Typography>
            }
            sx={{
              backgroundColor: '#006663',
              color: 'white',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />

          <CardContent>
            <Typography mb={2} variant="h6">
              <strong>Email:</strong> {member.email}
            </Typography>
            <Typography mb={2} variant="h6">
              <strong>Phone:</strong> {member.phoneNumber}
            </Typography>

            {member.bio && (
              <Chip
                label={member.bio}
                variant="outlined"
                sx={{
                  mt: 3,
                  backgroundColor: 'black',
                  padding: 2.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'white',
                  wordBreak: 'break-word',
                }}
              />
            )}

            <Box mt={4}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Number of Event</strong></TableCell>
                    <TableCell><strong>Payment Amount</strong></TableCell>
                    <TableCell><strong>Date of Payment</strong></TableCell>
                    <TableCell><strong>Payment Slips</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {member.incidents?.length
                        ? member.incidents.map((inc, idx) => (
                            <div key={idx}>{inc.eventNumber}</div>
                          ))
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {member.payments?.length
                        ? member.payments.map((pmt, idx) => (
                            <div key={idx}>{pmt.paymentAmount}</div>
                          ))
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {member.payments?.length
                        ? member.payments.map((pmt, idx) => (
                            <div key={idx}>{format(new Date(pmt.paymentDate), 'dd MMM yyyy')}</div>
                          ))
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {member.memberFiles?.length
                        ? member.memberFiles.map((file, idx) => (
                            <div key={idx}>
                              <a
                                href={file.filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {file.filePath}
                              </a>
                            </div>
                          ))
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            <Button onClick={handleView} color="inherit">
              Cancel
            </Button>
            {/* <Button onClick={handleUpdate} variant="contained" color="primary">
              Update
            </Button> */}

         
                    <Button variant="contained" color="primary"
                      onClick={handleDetailsClick}
                      data-member-id={member.id}
                      
                    >
                      
                      Update</Button>
                
          </CardActions>
        </Card>
      </Grid2>
      <SideDrawer />
    </Grid2>
    </>
  );
}
