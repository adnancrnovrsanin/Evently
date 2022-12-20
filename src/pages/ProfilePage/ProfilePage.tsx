import { observer } from "mobx-react-lite";
import './style.css';
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import { useParams } from "react-router-dom";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabContext, TabList, TabPanel } from "@mui/lab";

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
    label: string;
    value: string;
}

const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        // backgroundColor: '#1890ff',
    },
});
  
const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        minWidth: 0,
        [theme.breakpoints.up('sm')]: {
        minWidth: 0,
        },
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        color: 'rgba(0, 0, 0, 0.85)',
        fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            opacity: 1,
        },
        '&.Mui-selected': {
            // color: "nesto",
            fontWeight: theme.typography.fontWeightMedium,
        },
        // '&.Mui-focusVisible': {
        //     backgroundColor: '#d1eaff',
        // },
    }),
);


function ProfilePage() {
    const { username } = useParams();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile, setActiveTab, activeTab} = profileStore;
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (username) loadProfile(username);
        return () => {
            setActiveTab("1");
        }
    }, [loadProfile, username, setActiveTab])

    if (loadingProfile) return <InitialLoader adding="profile"/>

    if (!profile) return <h2>Problem loading profile</h2>

    function handleEditClick(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        setEditMode(!editMode);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    return (
        <div className="profilePageContainer">
            {profileStore.isCurrentUser && (
                <button className="editProfileButton" onClick={handleEditClick}>
                    {editMode ? 'Cancel' : 'Edit'}
                </button>
            )}
            {editMode ? <EditProfileForm setEditMode={setEditMode} /> : <ProfileInfo />}

            <Box sx={{ bgcolor: '#fff', marginTop: "50px", border: "1px solid purple" }}>
                <TabContext value={activeTab}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
                        <AntTab label="Events" value="1" />
                        <AntTab label="Photos" value="2" />
                        <AntTab label="Followers" value="3" />
                        <AntTab label="Following" value="4" />
                    </TabList>
                    <Box sx={{ p: 3 }}>
                        <TabPanel value="1">
                            Events
                        </TabPanel>

                        <TabPanel value="2">
                            Photos
                        </TabPanel>

                        <TabPanel value="3">
                            Followers
                        </TabPanel>

                        <TabPanel value="4">
                            Following
                        </TabPanel>
                    </Box>
                </TabContext>
            </Box>
        </div>
    );
}

export default observer(ProfilePage);