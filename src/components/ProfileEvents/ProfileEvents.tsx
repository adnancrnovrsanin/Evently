import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import { useStore } from '../../stores/store';
import { Profile, UserEvent } from '../../models/profile';
import './style.css';
import { Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { getCategoryImage } from '../../helpers/usefulFunctions';

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

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

interface Props {
    profile: Profile;
}

export default function ProfileEvents({ profile }: Props) {
  const [value, setValue] = React.useState(0);
  const { profileStore } = useStore();
    const {
        loadUserEvents,
        loadingEvents,
        userEvents
    } = profileStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (profile) loadUserEvents(profile.username);
    }, [loadUserEvents, profile]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    loadUserEvents(profile!.username, panes[newValue].pane.key);
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: 300 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        indicatorColor="secondary"
      >
        {panes.map((pane, x) => {
            return (
                <Tab key={x} label={pane.menuItem} {...a11yProps(x)} sx={{
                    '&.Mui-selected': { 
                        color: "purple",
                    },
                }} />
            )
        })}
      </Tabs>

        <Grid2 container spacing={3} sx={{
            paddingInline: "1rem",
            overflowY: "auto",
            width: "100%",    
            height: "100%"  
        }}>
            {!loadingEvents ? (
                userEvents.length > 0 ? (
                  userEvents.map((event: UserEvent) => {
                      return (
                          <Grid2 xs={12} sm={6} md={4} lg={3} xl={3} key={event.id}>
                              <Card sx={{ maxWidth: "100%", height: "100%", cursor: "pointer" }} onClick={() => navigate(`/events/${event.id}`)}>
                                  <CardMedia
                                      sx={{ height: 140 }}
                                      image={getCategoryImage(event.category)}
                                      title="event"
                                  />
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="div">
                                          {event.title}
                                      </Typography>
      
                                      <Typography sx={{
                                          color: "grey"
                                      }}>
                                          {dayjs(event.date).format('MMMM D, YYYY')}
                                      </Typography>
                                  </CardContent>
                              </Card>
                          </Grid2>
                      )
                  })
                ) : (
                    <Typography variant="body1" sx={{ m: 'auto' }}>
                      No events here.
                    </Typography>
                )
            ) : (
                <CircularProgress color='secondary' sx={{
                    margin: "auto",
                }}/>
            )}
        </Grid2>
    </Box>
  );
}