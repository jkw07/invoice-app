import { Paper, Button, Stack} from '@mui/material';

interface HorizontalMenuListProps {
    handleButtonClick: (component: string) => void;
    activeComponent: string;
}

export const HorizontalMenuList = ({handleButtonClick, activeComponent}: HorizontalMenuListProps) => {
  return (
    <Paper
      elevation={0}
      style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stack direction="row" spacing={2}>
      <Paper elevation={0}>
            <Button  variant={activeComponent === 'company' ? 'outlined' : 'contained'} onClick={() => handleButtonClick('company')} sx={{
              height: '50px',
              width: '200px',
              fontSize: '16px',
              }}>
              Dane Firmy
            </Button>
        </Paper>
        <Paper elevation={0} >
            <Button variant={activeComponent === 'user' ? 'outlined' : 'contained'} onClick={() => handleButtonClick('user')} sx={{
              height: '50px',
              width: '200px',
              fontSize: '16px',
              }}>
            Twoje Konto
            </Button>
        </Paper>
        <Paper elevation={0} >
            <Button  variant={activeComponent === 'invoices' ? 'outlined' : 'contained'} onClick={() => handleButtonClick('invoices')} sx={{
              height: '50px',
              width: '200px',
              fontSize: '16px',
              }}>
            Faktury
            </Button>
        </Paper>
      </Stack>
      </Paper>
  );
};