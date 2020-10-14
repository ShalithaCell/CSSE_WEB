import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { AddCircle } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import IconButton from '@material-ui/core/IconButton/IconButton';
import RemoveConfirmDialog from '../removeConfirmDialog';
import { ToastContainer } from '../dialogs/ToastContainer';
import { TOAST_SUCCESS, TOAST_ERROR } from '../../config';
import { updateUserList, removeUser } from '../../redux/userActions';
import Register from './register';

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

class ListOfUsers extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			showNewUserDialog : false,
			editable          : false,
			editRole          : 0,
			editUserID        : 0,
			popupDelete       : false,
			removeItem        : '',
			removeID          : null
		}
	}

	componentDidMount()
	{
		this.props.updateUserList(this.props.user.roleID);
	}

	onClickListner = async (e) =>
	{
		if (e.currentTarget.id === 'btnAddUser')
		{
			this.setState({
				...this.state,
				showNewUserDialog : true
			})
		}
		else if (e.currentTarget.id === 'btnClose')
		{
			this.setState({
				...this.state,
				showNewUserDialog : false
			})
		}
		else if (e.currentTarget.id === 'btnYes')
		{
			const result = await this.props.removeUser(this.state.removeID);

			if(result.result === true){
				this.setState({
					...this.state,
					popupDelete : false,
					removeID    : null,
					removeItem  : ''
				});

				ToastContainer(TOAST_SUCCESS, 'Successfully User is removed !');

				this.props.updateUserList(this.props.user.roleID);//refresh role list
			}else{
				ToastContainer(TOAST_ERROR, result.message);
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

	onClose = () => {
		this.setState({
			...this.state,
			showNewUserDialog : false
		});
	}

	onUserEditClick = (userID) => {
		this.setState({
			...this.state,
			showNewUserDialog : true,
			editable          : true,
			editUserID        : userID
		});
	}

	onUserDeleteClick = (userID, userName) => {
		this.setState({
			...this.state,
			popupDelete : true,
			removeID    : userID,
			removeItem  : userName
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
								title="List of Users"
								className={ 'text-left' }
								action={
    <Button variant="outlined" color="primary" startIcon={ <AddCircle /> } id="btnAddUser" onClick={ this.onClickListner.bind(this) }>
        Add User
    </Button>
								}
							/>
                    <CardContent>

                        <MaterialTable
									title=""
									columns={ [
										{ title: 'User name', field: 'userName' },
										{ title: 'Email', field: 'email' },
										{ title: 'Role', field: 'roleName' },
										{ title: 'Email Confirmed', field: 'locked' }
									] }
									data={ this.props.userList  }
									actions={ [
										(rowData) => ({
											icon     : 'edit',
											tooltip  : rowData.modifyAllowed ? 'Click here to edit user' : 'no permission to edit.',
											onClick  : (event, rowData) => this.onUserEditClick( rowData.id),
											disabled : !rowData.modifyAllowed
										}),
										(rowData) => ({
											icon     : 'delete',
											tooltip  : rowData.modifyAllowed ? 'Click here to remove user' : 'no permission to remove.',
											onClick  : (event, rowData) => this.onUserDeleteClick(rowData.id, rowData.userName ),
											disabled : !rowData.modifyAllowed
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
        <Dialog open={ this.state.showNewUserDialog } aria-labelledby="form-dialog-title" fullWidth={ true } maxWidth={ 'md' }>
            <DialogTitle disableTypography >
                <IconButton id="btnClose" onClick={ this.onClickListner.bind(this) } className={ 'pull-right' }>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                { <Register editable={ this.state.editable } userID={ this.state.editUserID } editRole={ this.state.editRole } dialogClose={ this.onClose }/> }
            </DialogContent>
        </Dialog>
        <RemoveConfirmDialog popupDelete={ this.state.popupDelete } item={ this.state.removeItem }  onRemoveClick={ this.onClickListner }/>
    </div>
		)
	}
}

ListOfUsers.propTypes = {
	classes : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	userList : state.user.users,
	user     : state.user
})

export default connect(mapStateToProps, { updateUserList, removeUser })(withStyles(useStyles)(ListOfUsers));
