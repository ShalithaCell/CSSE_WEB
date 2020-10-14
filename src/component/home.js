import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './navbar';
import { GetSession } from '../services/sessionManagement';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Table from '@material-ui/core/Table';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import MaterialTable from 'material-table';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { ADD_BILL_TRANSACTION_ENDPOINT } from '../config';

const useStyles = makeStyles((theme) => ({
	root : {
		height : '100vh',
		width  : '150vh'

	},
	paper : {
		margin : theme.spacing(2, 2),

		display : 'flex',

		flexDirection : 'column',

		alignItems : 'center',

		'& > *' : {
			margin : theme.spacing(1)
		}
	},
	cardGrid : {
		paddingTop : theme.spacing(8),

		paddingBottom : theme.spacing(8)
	},
	card : {
		height : '100%',

		display : 'flex',

		flexDirection : 'column'
	},
	cardMedia : {
		paddingTop : '56.25%' // 16:9
	},
	cardContent : {
		size : '10%'
	},
	table : {
		minWidth : 500,

		margintop : 100
	},
	button : {
		width : 80
	}

}));
function ccyFormat(num) {
	return `${ num.toFixed(2) }`;
}

function priceRow(qty, unit) {
	return qty * unit;
}

function createRow(desc, qty, unit) {
	const price = priceRow(qty, unit);
	return { desc, qty, unit, price };
}

function subtotal(items) {
	return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const primary = red[ 500 ]; // #F44336
const accent = purple[ 'A200' ]; // #E040FB
const accent2 = purple.A200;

const TAX_RATE = 0.07;

const rows = [
	createRow('', '', ''),
	createRow('', '', ''),
	createRow('', '', '')
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

export default function AddBills() {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [ state, setState ] = React.useState({
		columns : [
			{ title: 'Description', field: 'description' },
			{ title: 'Qty', field: 'qty' },
			{ title: 'Unit Price', field: 'unitPrice', type: 'double' },
			{ title: 'Sum', field: 'sum' },
			{ title: 'SubTotal', field: 'subTotal' },
			{ title: 'Discount', field: 'discount' },
			{ title: 'Total', field: 'total' }
		],
		data : []

	});

		async function finalBill()
		{
			const localData = JSON.parse(GetSession());
			let token = localData.sessionData.token;
			token = decrypt(token); //decrypt the token

			const success = false;
			let resData;

			console.log(token)

			const billobj = {
				description : state.data
			}
			console.log(state.columns);

			//API call
			await axios({
				method  : 'post',
				url     : ADD_BILL_TRANSACTION_ENDPOINT,
				headers : { Authorization: 'Bearer ' + token },
				data    : state.data
			})
				.then(function(response)

				{
					console.log('ok');

				})
				.catch(function(error)
				{
					/*
					if(error.response.status === 401){
						dispatch({
							type    : SET_SESSION_EXPIRED,
							payload : true
						})
					}
					throw error;
					*/
				});
		}

	return (
    <div>
        <Navbar />
        <Grid container component="main" className={ classes.root }>
            <CssBaseline />
      
            <Grid item xs={ false } sm={ 4 } md={ 7 }>
                <div className={ classes.paper }>
                    <Container className={ classes.cardGrid } maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={ 4 }>
                            { cards.map((card) => (
                                <Grid item key={ card } xs={ 12 } sm={ 6 } md={ 4 }>
                                    <Card className={ classes.card }>
                                        <CardMedia
										className={ classes.cardMedia }
										image="https://source.unsplash.com/random"
										title="Image title"
									/>
                                        <CardContent className={ classes.cardContent }>
                                            <Typography >
                                                Product Name
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" size="small" color="secondary">
                                                Buy
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
						))}
                        </Grid>
                    </Container>
                </div>
            </Grid>

            <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                <Table className={ classes.table } >
                    <MaterialTable
					title="PriceList"
					columns={ state.columns }
					data={ state.data }
					editable={ {
						onRowAdd : (newData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									setState((prevState) => {
										const data = [ ...prevState.data ];
										data.push(newData);
										return { ...prevState, data };
									});
								}, 600);
							}),
						onRowUpdate : (newData, oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										setState((prevState) => {
											const data = [ ...prevState.data ];
											data[ data.indexOf(oldData) ] = newData;
											return { ...prevState, data };
										});
									}
								}, 600);
							}),
						onRowDelete : (oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									setState((prevState) => {
										const data = [ ...prevState.data ];
										data.splice(data.indexOf(oldData), 1);
										return { ...prevState, data };
									});
								}, 600);
							})
					} }
				/>

                </Table>
			
                <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                    <ButtonGroup variant="contained" orientation="horizontal" color="primary" aria-label="horizontal contained primary button group">
                        <Button size="large" variant="contained">1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>c</Button>
                        <Button>Qty</Button>
                        <Button>Sec1</Button>
                        <Button>Employee</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button variant="contained" color="secondary"  size="large">Review</Button>
                    </ButtonGroup>
                    <ButtonGroup variant="contained" orientation="horizontal" size="large" color="primary" aria-label="horizontal contained primary button group">
                        <Button>4</Button>
                        <Button>5</Button>
                        <Button>6</Button>
                        <Button>b</Button>
                        <Button>Disc</Button>
                        <Button>Pannel</Button>
                        <Button>Info</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button variant="contained" color="secondary"  startIcon={ <SaveIcon /> } size="large">PayBills</Button>
                    </ButtonGroup>
                    <ButtonGroup variant="contained" orientation="horizontal" size="large" color="primary" aria-label="horizontal contained primary button group">
                        <Button>7</Button>
                        <Button>8</Button>
                        <Button>9</Button>
                        <Button>a</Button>
                        <Button>Price</Button>
                        <Button>Sales</Button>
                        <Button>Attend</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button variant="contained" color="secondary"  size="large">Discount</Button>
                    </ButtonGroup>
                    <ButtonGroup  variant="contained"  orientation="horizontal" size="large" color="primary" aria-label="horizontal contained primary button group">
                        <Button>+</Button>
                        <Button>0</Button>
                        <Button >-</Button>
                        <Button>.</Button>
                        <Button>Del</Button>
                        <Button>%</Button>
                        <Button>*</Button>
                        <Button>Chec</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button  size="medium" color="primary" >Loyalty</Button>
                        <Button  color="primary" endIcon={ <Icon>send</Icon> } size="large" href={ 'http://localhost:3000/checkout' } className={ classes.submit } onClick={ finalBill }>Payment</Button>
                    </ButtonGroup>
                </Grid>

            </Grid>
        </Grid>
    </div>
);
 }
