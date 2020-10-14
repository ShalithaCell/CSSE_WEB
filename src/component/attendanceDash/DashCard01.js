import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';
import Button from '@material-ui/core/Button';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({
	depositContext : {
		flex : 1
	}
});

export default function Deposits() {
	const classes = useStyles();
	return (
    <React.Fragment>
        <Title>Present</Title>
        <Typography component="p" variant="h4">
            <Button variant="contained" size='small' href="http://localhost:3000/Attendance" >
                Show All
            </Button>
        </Typography>
    </React.Fragment>
	);
}
