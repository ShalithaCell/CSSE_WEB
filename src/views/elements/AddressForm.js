import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from "react-redux";

function AddressForm(props)
{
    const { details } = props;

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id='firstName'
                        name='firstName'
                        label='First name'
                        fullWidth
                        autoComplete='given-name'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id='lastName'
                        name='lastName'
                        label='Last name'
                        fullWidth
                        autoComplete='family-name'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id='address1'
                        name='address1'
                        label='Address line 1'
                        fullWidth
                        disabled
                        value={details !== null ? details.address : ''}
                        autoComplete='shipping address-line1'
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
                        label='Use this address for payment details'
                    />
                </Grid>
            </Grid>
        </>
    );
}

const mapStateToProps = (state) => ({
    details : state.system.paymentFormDetails,
});

export default connect(mapStateToProps, null)(AddressForm);
