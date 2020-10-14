import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { updateRoleDetails, removeRole } from '../../redux/roleActions';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { AddCircle } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import RegisterRole from './registerRole';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import IconButton from '@material-ui/core/IconButton/IconButton';
import RemoveConfirmDialog from '../removeConfirmDialog';
import { ToastContainer } from '../dialogs/ToastContainer';
import { TOAST_SUCCESS, TOAST_ERROR } from '../../config';

const useStyles  = (theme) =>  ({
	root : {
		minWidth : 275
	},
	bullet : {
		display   : 'inline-block',
		margin    : '0 2px',
		transform : 'scale(0.8)'
	},
	title : {
		fontSize : 14
	},
	pos : {
		marginBottom : 12
	}
});

class ListOfRoles extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			showNewRoleDialog : false,
			editable          : false,
			editRole          : 0,
			popupDelete       : false,
			removeItem        : '',
			removeID          : null
		}
	}

	componentDidMount()
	{
		this.props.updateRoleDetails();
	}

	onClickListner = async (e) =>
	{
		if (e.currentTarget.id === 'btnNewRole')
		{
			this.setState({
				showNewRoleDialog : true,
				editable          : false
			});
		}
		else if (e.currentTarget.id === 'btnClose')
		{
			this.setState({
				showNewRoleDialog : false
			});
		}
		else if (e.currentTarget.id === 'btnYes')
		{

			const response = await this.props.removeRole(this.state.removeID);

			if(response){
				this.setState({
					...this.state,
					popupDelete : false,
					removeID    : null,
					removeItem  : ''
				});

				ToastContainer(TOAST_SUCCESS, 'Successfully Role is removed !');

				this.props.updateRoleDetails();//refresh role list
			}else{
				ToastContainer(TOAST_ERROR, 'Role cannot removed !. Its reference by the user.');
			}
		}
		else if (e.currentTarget.id === 'btnNo')
		{
			this.setState({
				...this.state,
				popupDelete : false,
				removeID    : null,
				removeItem  : ''
			});

		}
	}

	onRoleEditClick = (roleID) => {
		this.setState({
			editable          : true,
			editRole          : roleID,
			showNewRoleDialog : true
		});
	}

	onRoleDeleteClick = (roleID, roleName) => {
		this.setState({
			...this.state,
			popupDelete : true,
			removeID    : roleID,
			removeItem  : roleName
		});
	}

	render()
	{
		const { classes  } = this.props;

		return (
    <div>
        <Navbar/>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Card className={ classes.root }>
                    <CardHeader
			title="List of Roles"
			className={ 'text-left' }
			action={
    <Button variant="outlined" color="primary" startIcon={ <AddCircle /> } id="btnNewRole" onClick={ this.onClickListner.bind(this) }>
        Add Role
    </Button>
			}
			/>
                    <CardContent>

                        <MaterialTable
							title=""
							columns={ [
								{ title: 'Role name', field: 'roleName' },
								{ title: 'Display name', field: 'roleDisplayName' }
							] }
							data={ this.props.roleList.roleList  }
							actions={ [
								(rowData) => ({
									icon     : 'edit',
									tooltip  : rowData.editable ? 'Click here to edit role' : 'Cannot edit default roles',
									onClick  : (event, rowData) => this.onRoleEditClick( rowData.id),
									disabled : !rowData.editable
								}),
								(rowData) => ({
									icon     : 'delete',
									tooltip  : rowData.editable ? 'Click here to remove role' : 'Cannot remove default roles',
									onClick  : (event, rowData) => this.onRoleDeleteClick(rowData.id, rowData.roleName ),
									disabled : !rowData.editable
								})
							] }
							options={ {
								actionsColumnIndex : -1,
								search             : true,
								headerStyle        : {
									backgroundColor : '#01579b',
									color           : '#FFF'
								}
							} }
						/>

                    </CardContent>

                </Card>
            </Container>
        </div>
        <Dialog open={ this.state.showNewRoleDialog } aria-labelledby="form-dialog-title" fullWidth={ true } maxWidth={ 'md' }>
            <DialogTitle disableTypography >
                <IconButton id="btnClose" onClick={ this.onClickListner.bind(this) } className={ 'pull-right' }>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <RegisterRole editable={ this.state.editable } editRole={ this.state.editRole }/>
            </DialogContent>
        </Dialog>
        <RemoveConfirmDialog popupDelete={ this.state.popupDelete } item={ this.state.removeItem }  onRemoveClick={ this.onClickListner }/>
    </div>
		)
	}
}

ListOfRoles.propTypes = {
	classes : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	roleList : state.role
})

export default connect(mapStateToProps, { updateRoleDetails, removeRole })(withStyles(useStyles)(ListOfRoles));
