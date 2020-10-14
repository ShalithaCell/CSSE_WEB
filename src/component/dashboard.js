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
import HomeIcon from '@material-ui/icons/Home';
import DashCard1 from './Inventory/dashCard1';
import DashCard2 from './Inventory/dashCard2';
import DashCard3 from './Inventory/dashCard3';
import DashCard4 from './Inventory/dashCard4';
import DashCard5 from './Inventory/dashCard5';
import DashCard6 from './Inventory/dashCard6';
import Orders from './Inventory/orders';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Navbar from './navbar';
import imgOk from '../resources/images/ok_img.png';

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

export default function DashboardInventory() {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(false);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
    <Container component="main" maxWidth="sx">
        <Navbar/>
        <div className={ classes.root }>
            <AppBar position="absolute" className={ clsx(classes.appBar, open && classes.appBarShift) }>
                <Toolbar className={ classes.toolbar }>
                    <IconButton color="inherit" href={ 'http://localhost:3000/home' }>
                        <Fab size="small" color="primary" aria-label="add" className={ classes.margin }>
                            <HomeIcon/>
                        </Fab>
                    </IconButton>
                    <Typography component="h1" variant="h5" color="inherit" noWrap className={ classes.title }>
                        Inventory
                    </Typography>
                    <IconButton color="inherit" href={ 'http://localhost:3000/addinventory' }>
                        <Fab size="small" color="secondary" aria-label="add" className={ classes.margin }>
                            <AddIcon />
                        </Fab>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={ classes.content }>
                <div className={ classes.appBarSpacer } />
                <Container maxWidth="lg" className={ classes.container }>
                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard1 />
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard2 />
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard3 />
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard4 />
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper } >
                                <Button variant="contained" color="secondary">
                                    REPORTS
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard5 />
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper }>
                                <DashCard6 />
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                            <Paper className={ fixedHeightPaper } >
                                <Button variant="contained" color="secondary" href="http://localhost:3000/updateinventory">
                                    DETAILS
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Paper className={ classes.paper }>
                                <Orders />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    </Container>

	);
}
