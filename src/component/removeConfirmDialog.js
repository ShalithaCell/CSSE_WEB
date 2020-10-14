import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import deleteImage from '../resources/images/delete_img.png';

class RemoveConfirmDialog extends Component
{

	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
    <div>
        <Dialog
					open={ this.props.popupDelete }
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{'Confirm to Delete'}</DialogTitle>
            <DialogContent>
                <div className="text-center">
                    <img src={ deleteImage } alt={ 'remove.png' } align={ 'center' } className={ 'delete-img' }/>
                </div>
                <div className="row">
                    <br/>
                    <h6>Are you sure want to remove ' { this.props.item } ' ? </h6>
                </div>

            </DialogContent>
            <DialogActions>
                <Button id={ 'btnYes' } onClick={ this.props.onRemoveClick } color="secondary">
                    Yes
                </Button>
                <Button id={ 'btnNo' } onClick={ this.props.onRemoveClick } color="primary" autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    </div>
		)
	}
}

export default RemoveConfirmDialog;
