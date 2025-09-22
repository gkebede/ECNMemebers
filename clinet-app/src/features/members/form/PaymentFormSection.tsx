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
  'receiptAttached',
  'bankTransfer',
];

const paymentRecurringTypes: string[] = [
  'annual',
  'monthly',
  'quarterly',
  'incident',
  'membership',
  'miscellaneous',
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

    switch (name) {
      case 'paymentAmount':
        // Keep as number internally, formatted in display
        payment.paymentAmount = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
        break;
      case 'paymentType':
        payment.paymentType = value;
        break;
      case 'paymentRecurringType':
        payment.paymentRecurringType = value;
        break;
      case 'paymentDate':
        payment.paymentDate = value;
        break;
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

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Box mt={2}>
        <Typography variant="h6">Payments</Typography>
        {payments.map((payment, index) => (
          <Box
            key={payment.id}
            display="grid"
            gridTemplateColumns="1fr 1fr 2fr 2fr auto"
            gap={2}
            alignItems="center"
            mt={2}
          >
            {/* Payment Date */}
            <TextField
              label="Date"
              type="date"
              name="paymentDate"
              value={payment.paymentDate}
              onChange={(e) => handleChange(index, e)}
              fullWidth
            />

            {/* Payment Amount */}
            <TextField
              label="Amount"
              name="paymentAmount"
              value={formatCurrency(payment.paymentAmount)}
              onChange={(e) => handleChange(index, e)}
              fullWidth
            />

            {/* Payment Type */}
            <TextField
              select
              label="Payment Type"
              name="paymentType"
              value={payment.paymentType || ''}
              onChange={(e) => handleChange(index, e)}
              fullWidth
            >
              {paymentMethods.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            {/* Recurring Type */}
            <TextField
              select
              label="Recurring Type"
              name="paymentRecurringType"
              value={payment.paymentRecurringType || ''}
              onChange={(e) => handleChange(index, e)}
              fullWidth
            >
              {paymentRecurringTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            {/* Delete Button */}
            <IconButton onClick={() => handleRemove(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          onClick={handleAdd}
          sx={{ mt: 2 }}
          variant="outlined"
          color="primary"
        >
          Add Payment
        </Button>
      </Box>
    </Paper>
  );
}
