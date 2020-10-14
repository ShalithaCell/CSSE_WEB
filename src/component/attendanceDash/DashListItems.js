import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import EqualizerTwoToneIcon from '@material-ui/icons/EqualizerTwoTone';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditLocationTwoToneIcon from '@material-ui/icons/EditLocationTwoTone';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

export const mainListItems = (
    <div>
        <ListItem button >
            <Button >
                <ListItemIcon>
                    <EmojiEventsIcon/>
                </ListItemIcon>
                <ListItemText primary="Best Performance" />
            </Button>
        </ListItem>
        <ListItem >
            <Button href="http://localhost:3000/AddAttendance">
                <Tooltip title="Add Branch">
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Add Attendance" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button>
                <ListItemIcon>
                    <EqualizerTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Today" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button>
                <ListItemIcon>
                    <EqualizerTwoToneIcon  />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button >
                <ListItemIcon>
                    <EqualizerTwoToneIcon  />
                </ListItemIcon>
                <ListItemText primary="Year end Attendance" />
            </Button>
        </ListItem>
    </div>
);
