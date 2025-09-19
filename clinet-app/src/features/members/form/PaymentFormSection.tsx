import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Paper,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { Payment } from '../../../lib/types';

const paymentMethods: string[] = [
  'cash',
  'creditCard',
  'check',
  'reciptAttached',
  'bankTransfer',
];

const paymentRecurringType: string[] = [
  'annual',
  'monthly',
  'quarterly',
  'incident',
  'membership',
  'mislaneous',
];

type Props = {
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
};

export default function PaymentFormSection({ payments, setPayments }: Props) {
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = [...payments];
    const payment = { ...updated[index] };

    if (name === 'paymentAmount') {
      payment.paymentAmount = parseFloat(value) || 0;
    } else if (name === 'paymentType') {
      payment.paymentType = value;
    } else if (name === 'paymentRecurringType') {
      payment.paymentRecurringType = value;
    } else if (name === 'paymentDate') {
      payment.paymentDate = value;
    }

    updated[index] = payment;
    setPayments(updated);
  };

  const handleAdd = () => {
    setPayments([
      ...payments,
      {
        id: uuidv4(),
        paymentAmount: 0,
        paymentDate: '',
        paymentType: '',
        paymentRecurringType: '',
      },
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = [...payments];
    updated.splice(index, 1);
    setPayments(updated);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Box mt={3}>
        <Typography variant="h6">Payments</Typography>
        {payments.map((payment, index) => (
          <Box
            key={payment.id}
            display="grid"
            gridTemplateColumns="repeat(6, 1fr)"
            gap={2}
            alignItems="center"
            mt={2}
          >
            <TextField
              label=""
              type="date"
              name="paymentDate"
              value={payment.paymentDate}
              onChange={(e) => handleChange(index, e)}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>$</span>
              <TextField
                type="number"
                inputProps={{ step: '0.01', min: '0' }}
                value={payment.paymentAmount}
                name="paymentAmount"
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <TextField
              select
              label="Payment Type"
              value={(payment.paymentType || '').toLowerCase()}
              name="paymentType"
              onChange={(e) => handleChange(index, e)}
              fullWidth
              variant="outlined"
            >
              {paymentMethods.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Recurring Type"
              name="paymentRecurringType"
              onChange={(e) => handleChange(index, e)}
              value={(payment.paymentRecurringType || '').toLowerCase()}
              fullWidth
              variant="outlined"
            >
              {paymentRecurringType.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Box />
            <IconButton onClick={() => handleRemove(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={handleAdd} sx={{ mt: 2 }} variant="outlined">
          Add Payment
        </Button>
      </Box>
    </Paper>
  );
}
