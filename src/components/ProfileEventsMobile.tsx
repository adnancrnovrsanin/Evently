import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Profile, UserEvent } from '../models/profile';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/store';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { getCategoryImage } from '../helpers/usefulFunctions';

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

interface Props {
    profile: Profile;
}

export default function ProfileEventsMobile({ profile }: Props) {
    const [value, setValue] = React.useState(0);
    const { profileStore } = useStore();
        const {
            loadUserEvents,
            loadingEvents,
            userEvents
        } = profileStore;
        const navigate = useNavigate();

        React.useEffect(() => {
            if (profile) loadUserEvents(profile.username);
        }, [loadUserEvents, profile]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        loadUserEvents(profile!.username, panes[newValue].pane.key);
        setValue(newValue);
    };

  return (
    <Box 
        sx={{ 
            width: "100%",
            borderTop: "1px solid purple",
            bgcolor: 'background.paper',
            padding: 0,
            '&.MuiTabPanel-root': {
                padding: 0,
            },
            display: 'flex',
            flexDirection: 'column',
            gap: "20px",
        }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        indicatorColor="secondary"
      >
        {panes.map((pane, x) => {
            return (
                <Tab key={x} label={pane.menuItem} sx={{
                    '&.Mui-selected': { 
                        color: "purple",
                    },
                    fontSize: "0.7rem",
                }} />
            )
        })}
      </Tabs>

        <Grid2 container spacing={3} sx={{
            overflowY: "auto",
            marginInline: "auto",
            width: "100%",    
            height: "100%"  
        }}>
            {!loadingEvents ? (
                userEvents.length > 0 ? (
                  userEvents.map((event: UserEvent) => {
                      return (
                          <Grid2 xs={12} sm={12} md={6} lg={4} xl={3} key={event.id}>
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
                    <Typography variant="body1" sx={{ 
                        textAlign: "center",
                        margin: "50px auto",
                    }}>
                      No events here.
                    </Typography>
                )
            ) : (
                <CircularProgress color='secondary' sx={{
                    margin: "50px auto",
                }}/>
            )}
        </Grid2>
    </Box>
  );
}