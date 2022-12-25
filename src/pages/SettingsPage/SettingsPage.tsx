import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useStore } from '../../stores/store';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
    children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SettingsPage() {
    const { profileStore: { deleteProfile } } = useStore();
    const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, marginTop: "150px" }}
    >
      <Tabs
        textColor='secondary'
        indicatorColor='secondary'
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Account" {...a11yProps(0)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Button
            variant='contained'
            color='error'
            sx={{ width: '100%' }}
            onClick={handleClickOpen}
        >
            Delete account
        </Button>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Are you sure you want to delete your account?"}</DialogTitle>
            <DialogActions sx={{ display: "flex", justifyContent: "space-between"}}>
                <Button onClick={handleClose} variant="contained" color='primary'>Cancel</Button>
                <Button variant="outlined" color="error"
                    onClick={() => {
                        deleteProfile();
                        handleClose();
                        navigate('/');
                    }}
                >DELETE</Button>
            </DialogActions>
        </Dialog>
      </TabPanel>
    </Box>
  );
}

export default observer(SettingsPage)