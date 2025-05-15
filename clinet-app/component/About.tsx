import { Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

export default function About() {
  const handleClick = async () => {
    const res = await fetch('/api/Payments');
    const session = await res.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };
  return   <Button 
  variant="contained" 
  color="primary" 
  onClick={handleClick}
  >Pay Here</Button>

}
