import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import RegisterRoleDetails from './registerRoleDetails';
import PermissionLevels from './permissionLevel';
import Navbar from '../navbar';
import imgOk from '../../resources/images/ok_img.png';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import '../../resources/styles/common.css';
import { updateRoleDetails, getRoleInformation } from '../../redux/roleActions';
import { connect } from 'react-redux';
import { addNewRole, updateRole } from '../../redux/roleActions';

const useStyles  = (theme) =>  ({
	appBar : {
		position : 'relative'
	},
	layout : {
		width                                                : 'auto',
		marginLeft                                           : theme.spacing(2),
		marginRight                                          : theme.spacing(2),
		[ theme.breakpoints.up(600 + theme.spacing(2) * 2) ] : {
			width       : 600,
			marginLeft  : 'auto',
			marginRight : 'auto'
		}
	},
	paper : {
		marginTop                                            : theme.spacing(1),
		marginBottom                                         : theme.spacing(3),
		padding                                              : theme.spacing(2),
		[ theme.breakpoints.up(600 + theme.spacing(3) * 2) ] : {
			marginTop    : theme.spacing(6),
			marginBottom : theme.spacing(6),
			padding      : theme.spacing(3)
		}
	},
	stepper : {
		padding : theme.spacing(3, 0, 5)
	},
	buttons : {
		display        : 'flex',
		justifyContent : 'flex-end'
	},
	button : {
		marginTop  : theme.spacing(3),
		marginLeft : theme.spacing(1)
	}
});

class RegisterRole extends Component{

	constructor(props)
	{
		super(props);
		this.state = {
			activeStep              : 0,
			roleWarning             : '',
			role                    : '',
			roleDisplay             : '',
			roleDisplayWarning      : '',
			test                    : '',
			reportAllowed           : false,
			salesAllowed            : false,
			inventoryViewAllowed    : false,
			inventoryAddAllowed     : false,
			inventoryUpdateAllowed  : false,
			inventoryDeleteAllowed  : false,
			customerHandlingAllowed : false
		}
	}

	async componentDidMount()
	{
		this.props.updateRoleDetails();

		if(this.props.editable){
			console.log('editable');

			const response = await this.props.getRoleInformation(this.props.editRole);

			if(response == null){
				return ;
			}

			this.setState({
				...this.state,
				role        : response.name,
				roleDisplay : response.displayName
			});

			Object.keys(response.rolePermissionLevels).forEach(function(key) {
				const item = (response.rolePermissionLevels[ key ]);
				if(item == null)
					return;

				switch (item.customPermissonID)
				{
					case 1:
						this.setState({
							...this.state,
							reportAllowed : item.allowed
						});
						break;
					case 2:
						this.setState({
							...this.state,
							salesAllowed : item.allowed
						});
						break;
					case 3:
						this.setState({
							...this.state,
							inventoryViewAllowed : item.allowed
						});
						break;
					case 4:
						this.setState({
							...this.state,
							inventoryAddAllowed : item.allowed
						});
						break;
					case 5:
						this.setState({
							...this.state,
							inventoryUpdateAllowed : item.allowed
						});
						break;
					case 6:
						this.setState({
							...this.state,
							inventoryDeleteAllowed : item.allowed
						});
						break;
					case 7:
						this.setState({
							...this.state,
							customerHandlingAllowed : item.allowed
						});
						break;
				}
			}.bind(this));

		}
	}

	onTextChange = (e) => {

		//identified the textbox
		if (e.target.id === 'role'){
			//remove all special characters
			e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');

			//check role is already Exists
			const roleExists = this.props.roleList.roleList.some((item) => item.roleName === e.target.value);

			if(roleExists){
				this.setState({
					roleWarning : 'Role name is already exists'
				});
			}else{
				this.setState({
					roleWarning : ''
				});
			}

			this.setState({
				role : e.target.value
			});
		}else if (e.target.id === 'roleDisplay'){
			//check role is already Exists
			const roleExists = this.props.roleList.roleList.some((item) => item.roleDisplayName === e.target.value);

			if(roleExists){
				this.setState({
					roleDisplayWarning : 'Display name is already exists'
				});
			}else{
				this.setState({
					roleDisplayWarning : ''
				});
			}

			this.setState({
				roleDisplay : e.target.value
			});
		}
	}

	onSwitchChanged = (e) => {
		this.setState({
			[ e.target.id ] : e.target.checked
		})
	}

	ButtonOnClickListner = async () =>
	{

		if (this.state.activeStep === 1)
		{
			if (this.state.role.length === 0)
			{
				this.setState({
					roleWarning : 'Role name is already exists'
				});
				return;
			}

			if (this.state.roleDisplay.length === 0)
			{
				this.setState({
					roleDisplayWarning : 'Display name is required.'
				});
				return;
			}

			const objRoleData = {
				'Name'                 : this.state.role,
				'DisplayName'          : this.state.roleDisplay,
				'OrgID'                : 1,
				'RolePermissionLevels' : [
					{ 'CustomPermissonID': 1, 'Allowed': this.state.reportAllowed },
					{ 'CustomPermissonID': 2, 'Allowed': this.state.salesAllowed },
					{ 'CustomPermissonID': 3, 'Allowed': this.state.inventoryViewAllowed },
					{ 'CustomPermissonID': 4, 'Allowed': this.state.inventoryAddAllowed },
					{ 'CustomPermissonID': 5, 'Allowed': this.state.inventoryUpdateAllowed },
					{ 'CustomPermissonID': 6, 'Allowed': this.state.inventoryDeleteAllowed },
					{ 'CustomPermissonID': 7, 'Allowed': this.state.customerHandlingAllowed }
				]
			}
			let result;
			if(this.props.editable){
				result = await this.props.updateRole(objRoleData);
			}else{
				result = await this.props.addNewRole(objRoleData);
			}

			this.setState({
				activeStep : this.state.activeStep + 1
			});

			this.props.updateRoleDetails(); //fetch roles from the server

			//again set to default
			this.setState({
				...this.state,
				roleWarning             : '',
				role                    : '',
				roleDisplay             : '',
				roleDisplayWarning      : '',
				test                    : '',
				reportAllowed           : false,
				salesAllowed            : false,
				inventoryViewAllowed    : false,
				inventoryAddAllowed     : false,
				inventoryUpdateAllowed  : false,
				inventoryDeleteAllowed  : false,
				customerHandlingAllowed : false
			});

			return;
		}

		//check role details are filled
		if (this.state.roleWarning.length !== 0 && this.state.roleDisplayWarning.length !== 0)
		{
			return;
		}

		if (this.state.role.length === 0)
		{
			this.setState({
				roleWarning : 'Role is required.'
			});
			return;
		}

		if (this.state.roleDisplay.length === 0)
		{
			this.setState({
				roleDisplayWarning : 'Display name is required.'
			});
			return;
		}

		this.setState({
			activeStep : this.state.activeStep + 1
		})
	};

	handleBack = () =>
	{
		this.setState({
			...this.state,
			activeStep : this.state.activeStep - 1
		})
	};

render()
{
	const { classes } = this.props;
	const steps = [ 'Role information', 'Permission' ];
	return(
    <React.Fragment>
        <CssBaseline/>
        <main className={ classes.layout }>
            <Paper className={ classes.paper }>
                <Typography component="h1" variant="h4" align="center">
                    New Role
                </Typography>
                <Stepper activeStep={ this.state.activeStep } className={ classes.stepper }>
                    {steps.map((label) => (
                        <Step key={ label }>
                            <StepLabel>{ label }</StepLabel>
                        </Step>
					))}
                </Stepper>
                <React.Fragment>
                    {this.state.activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                { this.state.editable ? 'Role is updated successfully.' : 'Role Saved Successfully.'}
                            </Typography>
                            <Typography variant="subtitle1">
                                <img src={ imgOk } alt="ok.png" />
                            </Typography>
                        </React.Fragment>
					) : (
    <React.Fragment>
        {this.state.activeStep === 0 ? <RegisterRoleDetails onTextChange={ this.onTextChange } data={ this.state } editable={ this.props.editable }/> : <PermissionLevels onSwitchChanged={ this.onSwitchChanged } data={ this.state }/> }
        <div className={ classes.buttons }>
            {this.state.activeStep !== 0 && (
            <Button onClick={ this.handleBack } className={ classes.button }>
                Back
            </Button>
								)}
            <Button
									variant="contained"
									color="primary"
									onClick={ this.ButtonOnClickListner }
									className={ classes.button }
								>
                {this.state.activeStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
        </div>
    </React.Fragment>
					)}
                </React.Fragment>
            </Paper>
            { /*
				<Typography variant="body2" color="textSecondary" align="center">
					{'Copyright © '}
					<Link color="inherit" href="#">
						A-PLus
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography> */
			}
        </main>
    </React.Fragment>
)
	;
}
}

RegisterRole.propTypes = {
	classes : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	roleList : state.role
})

export default connect(mapStateToProps, { updateRoleDetails, addNewRole, getRoleInformation, updateRole })(withStyles(useStyles)(RegisterRole));
