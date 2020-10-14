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
        
        <ListItem >
            <Button href="http://localhost:3000/storeDashboard">
                <ListItemIcon >
                    <StoreMallDirectoryIcon />
                </ListItemIcon>
                <ListItemText primary="Organization" />
            </Button>

        </ListItem>                        
        
        <ListItem >
            <Button href="http://localhost:3000/storeAdd">
                <Tooltip title="Add Branch">
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Add Branch" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button href="http://localhost:3000/storeDashboard">
                <Tooltip title="Manage Branch">
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Manage Branches" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button href="http://localhost:3000/storePlan">
                <ListItemIcon>
                    <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Month Plan" />
            </Button>
        </ListItem>

    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Comparing Profit</ListSubheader>
        <ListItem button >
            <Button href="http://localhost:3000/storeDashboard">
                <ListItemIcon>
                    <EmojiEventsIcon/>
                </ListItemIcon>
                <ListItemText primary="Best Branch" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button href="http://localhost:3000/storepie">
                <ListItemIcon>
                    <EqualizerTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Last week" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button href="http://localhost:3000/storeBar">
                <ListItemIcon>
                    <EqualizerTwoToneIcon  />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button href="http://localhost:3000/storepie">
                <ListItemIcon>
                    <EqualizerTwoToneIcon  />
                </ListItemIcon>
                <ListItemText primary="Last 6 months" />
            </Button>
        </ListItem>
        <ListItem button>
            <Button href="http://localhost:3000/storeBar">
                <ListItemIcon>
                    <EqualizerTwoToneIcon  />
                </ListItemIcon>
                <ListItemText primary="Year end sale" />
            </Button>
        </ListItem>
    </div>
);
