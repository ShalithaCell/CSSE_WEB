import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default class RegisterRoleDetails extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Role information
        </Typography>
        <Grid container spacing={ 3 }>
            <Grid item xs={ 12 }>
                <TextField
							required
							id="role"
							name="RoleName"
							label="Role"
							fullWidth
							disabled={ this.props.editable }
							value={ this.props.data.role }
							onChange={ this.props.onTextChange }
							error={ this.props.data.roleWarning.length !== 0 }
							helperText={ this.props.data.roleWarning }
							/>
            </Grid>
            <Grid item xs={ 12 }>
                <TextField
							required
							id="roleDisplay"
							name="roleDisplay"
							label="Display name"
							fullWidth
							value={ this.props.data.roleDisplay }
							onChange={ this.props.onTextChange }
							error={ this.props.data.roleDisplayWarning.length !== 0 }
							helperText={ this.props.data.roleDisplayWarning }
							/>
            </Grid>
        </Grid>
    </React.Fragment>
		);
	}
}
