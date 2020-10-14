import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DvrIcon from '@material-ui/icons/Dvr';
import Navbar from './navbar';
import { connect } from 'react-redux';
import { updateInventory, getInventoryDetails } from '../redux/InventoryActions';
import { ToastContainer } from './dialogs/ToastContainer';
import { TOAST_SUCCESS } from '../config';

const useStyles = makeStyles((theme) => ({
	paper : {
		marginTop     : theme.spacing(8),
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center'
	},
	avatar : {
		margin          : theme.spacing(2),
		backgroundColor : theme.palette.secondary.main
	},
	form : {
		width     : '100%',
		marginTop : theme.spacing(3)
	},
	update : {
		margin : theme.spacing(3, 0, 2)
	}
}));

const UpdateInventoryTable = (props) =>
{
	const classes = useStyles();

	const [ update, setupdate ] = useState({
		id            : props.location.state.id,
		productName   : props.location.state.productName,
		productCode   : props.location.state.productCode,
		qty           : props.location.state.qty,
		unitPrice     : props.location.state.unitPrice,
		supplireName  : props.location.state.supplireName,
		supplireEmail : props.location.state.supplireEmail
	})

	const UpdateInventory = (inventoryId) =>
	{
		console.log(inventoryId);

		const InventoryView = {
			ID     : update.id,
			PName  : update.productName,
			Pcode  : update.productCode,
			Qty_   : update.qty,
			Uprice : update.unitPrice,
			SName  : update.supplireName,
			SEmail : update.supplireEmail
		};
		props.updateInventory(InventoryView);
		props.getInventoryDetails();
		ToastContainer(TOAST_SUCCESS, "Updated Successfully")
	}
		const onChangeUpdate = (e) =>
		{
			e.persist();
			setupdate({ ...update, [ e.target.name ]: e.target.value })
		}

		useEffect(() =>
		{
			console.log(props.location.state);
		}, [ props.location.state ]);

	return (
    <Container component="main" maxWidth="xs">
        <Navbar/>
        <CssBaseline/>
        <div className={ classes.paper }>
            <Avatar className={ classes.avatar }>
                <DvrIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Update Inventory
            </Typography>
            <div className={ classes.form }>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField
								autoComplete="pname"
								name="productName"
								variant="outlined"
								id="productName"
								value={ update.productName }
								fullWidth
								label="Product Name"
								onChange={ onChangeUpdate }
							/>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField
								variant="outlined"
								fullWidth
								value={ update.productCode }
								label="Product Code"
								name="productCode"
								id="productCode"
								onChange={ onChangeUpdate }
							/>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
								variant="outlined"
								fullWidth
								value={ update.qty }
								id="qty"
								label="Quantity"
								name="qty"
								onChange={ onChangeUpdate }
							/>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
								variant="outlined"
								fullWidth
								name="unitPrice"
								value={ update.unitPrice }
								label="Unit Price"
								type="uprice"
								id="unitPrice"
								onChange={ onChangeUpdate }
							/>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
								variant="outlined"
								fullWidth
								name="supplireName"
								label="Supplire Name"
								value={ update.supplireName }
								type="sname"
								id="supplireName"
								autoComplete="current-sname"
								onChange={ onChangeUpdate }
							/>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
								variant="outlined"
								fullWidth
								name="supplireEmail"
								label="Supplire Email"
								value={ update.supplireEmail }
								type="semail"
								id="supplireEmail"
								autoComplete="current-email"
								onChange={ onChangeUpdate }
							/>
                    </Grid>
                </Grid>
                <Button
						onClick={ UpdateInventory }
						type="submit"
						variant="contained"
						color="primary"
						className={ classes.update }
					>
                    UPDATE
                </Button>
                <Grid container justify="flex-end">
                </Grid>
            </div>
        </div>
    </Container>
	);
}
const mapStateToProps = (state) => ({
	inventoryList : state.inventory.inventoryList
})
export default connect(mapStateToProps, { getInventoryDetails, updateInventory })(UpdateInventoryTable);