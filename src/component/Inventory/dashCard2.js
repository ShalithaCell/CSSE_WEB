import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles({
	depositContext : {
		flex : 1
	}
});

export default function Card2() {
	const classes = useStyles();
	return (
    <React.Fragment>
        <Title>Low Stock Products</Title>
        <Typography component="p" variant="h4">
            02
        </Typography>
    </React.Fragment>
	);
}
