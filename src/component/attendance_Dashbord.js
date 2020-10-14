import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DashCard01 from './attendanceDash/DashCard01';
import DashCard02 from './attendanceDash/DashCard02';
import DashCard03 from './attendanceDash/DashCard03';
import DashCard04 from './attendanceDash/DashCard04';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { mainListItems, secondaryListItems } from './attendanceDash/DashListItems';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Navbar from './navbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root : {
		display : 'flex'
	},
	toolbar : {
		paddingRight : 24
	},
	toolbarIcon : {
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'flex-end',
		padding        : '0 8px',
		...theme.mixins.toolbar
	},
	appBar : {
		zIndex     : theme.zIndex.drawer + 1,
		transition : theme.transitions.create([ 'width', 'margin' ], {
			easing   : theme.transitions.easing.sharp,
			duration : theme.transitions.duration.leavingScreen
		})
	},
	appBarShift : {
		marginLeft : drawerWidth,
		width      : `calc(100% - ${ drawerWidth }px)`,
		transition : theme.transitions.create([ 'width', 'margin' ], {
			easing   : theme.transitions.easing.sharp,
			duration : theme.transitions.duration.enteringScreen
		})
	},

	title : {
		flexGrow : 1
	},
	drawerPaper : {
		position   : 'relative',
		whiteSpace : 'nowrap',
		width      : drawerWidth,
		transition : theme.transitions.create('width', {
			easing   : theme.transitions.easing.sharp,
			duration : theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose : {
		overflowX  : 'hidden',
		transition : theme.transitions.create('width', {
			easing   : theme.transitions.easing.sharp,
			duration : theme.transitions.duration.leavingScreen
		}),
		width                          : theme.spacing(7),
		[ theme.breakpoints.up('sm') ] : {
			width : theme.spacing(9)
		}
	},
	appBarSpacer : theme.mixins.toolbar,
	content      : {
		flexGrow : 1,
		height   : '100vh',
		overflow : 'auto'
	},
	container : {
		paddingTop    : theme.spacing(4),
		paddingBottom : theme.spacing(4)
	},
	paper : {
		padding       : theme.spacing(2),
		display       : 'flex',
		overflow      : 'auto',
		flexDirection : 'column'
	},
	fixedHeight : {
		height : 150
	}
}));

export default function Dashboard() {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const [ open, setOpen ] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	
	const handleDrawerClose = () => {
		setOpen(false);
	};
	//const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

//
	return (
    <Container component="main" maxWidth="sx">
        <Navbar/> 
        <div className={ classes.root }>
            <CssBaseline />
            <AppBar position="absolute" className={ clsx(classes.appBar, open && classes.appBarShift) }>
                <Toolbar className={ classes.toolbar }>
                    <IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={ handleDrawerOpen }
						className={ clsx(classes.menuButton, open && classes.menuButtonHidden) }
					>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h5" color="inherit" noWrap className={ classes.title }>
                        Employee  Attendance  Dashboard
                    </Typography>
                    
                </Toolbar>
            </AppBar>
            <Drawer
				                  variant="permanent"
				                classes={ {
					            paper : clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
				                } }
				                open={ open }
		                             	>
                <div className={ classes.toolbarIcon }>
                    <IconButton onClick={ handleDrawerClose }>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
            </Drawer>
            <main className={ classes.content }>
                <div className={ classes.appBarSpacer } />
                <Container maxWidth="lg" className={ classes.container }>
                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard01 />
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard02 />
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard03 />
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard04 />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    </Container>
	);
}
