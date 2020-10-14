import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

export default class PermissionLevels extends Component {

	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Permission levels
        </Typography>
        <Grid container spacing={ 3 }>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h6 className="top-3pres">Report </h6>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h3><span className="badge badge-primary"> Normal </span></h3>
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Switch
					id = "reportAllowed"
					checked={  this.props.data.reportAllowed }
					onChange={ this.props.onSwitchChanged }
					color="primary"
					name="checkedB"
					inputProps={ { 'aria-label': 'primary checkbox' } }
				/>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h6 className="top-3pres">Sales </h6>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h3><span className="badge badge-danger"> Critical </span></h3>
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Switch
					id = "salesAllowed"
					checked={  this.props.data.salesAllowed }
					onChange={ this.props.onSwitchChanged }
					color="primary"
					name="checkedB"
					inputProps={ { 'aria-label': 'primary checkbox' } }
				/>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h6 className="top-3pres">Inventory View </h6>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h3><span className="badge badge-primary"> Normal </span></h3>
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Switch
					id = "inventoryViewAllowed"
					checked={  this.props.data.inventoryViewAllowed }
					onChange={ this.props.onSwitchChanged }
					color="primary"
					name="checkedB"
					inputProps={ { 'aria-label': 'primary checkbox' } }
				/>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h6 className="top-3pres">Inventory Add </h6>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h3><span className="badge badge-warning"> Considerable </span></h3>
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Switch
					id = "inventoryAddAllowed"
					checked={  this.props.data.inventoryAddAllowed }
					onChange={ this.props.onSwitchChanged }
					color="primary"
					name="checkedB"
					inputProps={ { 'aria-label': 'primary checkbox' } }
				/>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h6 className="top-3pres">Inventory Update </h6>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h3><span className="badge badge-warning"> Considerable </span></h3>
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Switch
					id = "inventoryUpdateAllowed"
					checked={  this.props.data.inventoryUpdateAllowed }
					onChange={ this.props.onSwitchChanged }
					color="primary"
					name="checkedB"
					inputProps={ { 'aria-label': 'primary checkbox' } }
				/>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h6 className="top-3pres">Inventory Delete </h6>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h3><span className="badge badge-danger"> Critical </span></h3>
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Switch
					id = "inventoryDeleteAllowed"
					checked={  this.props.data.inventoryDeleteAllowed }
					onChange={ this.props.onSwitchChanged }
					color="primary"
					name="checkedB"
					inputProps={ { 'aria-label': 'primary checkbox' } }
				/>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h6 className="top-3pres">Customer Handling </h6>
            </Grid>
            <Grid item xs={ 12 } md={ 4 } className="text-left">
                <h3><span className="badge badge-danger"> Critical </span></h3>
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Switch
					id = "customerHandlingAllowed"
					checked={  this.props.data.customerHandlingAllowed }
					onChange={ this.props.onSwitchChanged }
					color="primary"
					name="checkedB"
					inputProps={ { 'aria-label': 'primary checkbox' } }
				/>
            </Grid>
           
        </Grid>
    </React.Fragment>
		);
	}
}
