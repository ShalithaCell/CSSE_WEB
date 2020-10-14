import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import { Button, TableCell } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({

		depositContext : {
		flex       : 1,
		textCenter	: {
			textAlign : 'center'
		}
	},
	avatar : {
		backgroundColor : 'primary',
		height          : 56,
		position        : 'center',
		width           : 56,
		align           : 'center'
		
	},
	icon : {
		height     : 32,
		width      : 32,
		alignItems : 'center'

	}
	
});

export default function Deposits() {
	const classes = useStyles();
	return (
    <React.Fragment>
        <Table>
            <TableRow>
                <TableCell>
                    <Grid >
                        <Avatar className={ classes.avatar }>
                            <PeopleIcon  className={ classes.icon } />
                        </Avatar>
                    </Grid>
                </TableCell>
                <TableCell>

                    <Title>Total of Employees</Title>
                </TableCell>
            </TableRow>
        </Table>

        <Typography component="p" variant="h4">
            1500
        </Typography>

        <div>
            <IconButton color="inherit">
                <Button href="http://localhost:3000/home"
						variant="contained"

				> View</Button>
            </IconButton>
        </div>

    </React.Fragment>
	);
}
