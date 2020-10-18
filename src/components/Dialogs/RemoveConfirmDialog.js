/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import deleteImage from '../../assets/img/delete_img.png';

/**
 * This is the remove confirmation dialog for all entire application
 */
class RemoveConfirmDialog extends Component
{
    render()
    {
        const { popupDelete,
            item,
            onRemoveClick,
        } = this.props;

        return (
            <div>
                <Dialog
                    open={popupDelete}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'>Confirm to Delete</DialogTitle>
                    <DialogContent>
                        <div className='text-center'>
                            <img src={deleteImage} alt='remove.png' align='center' style={{ width: '75px' }} />
                        </div>
                        <div className='row'>
                            <br />
                            <h6>
                                Are you sure want to remove
                                {' '}
                                { item }
                                {' '}
                                ?
                                {' '}
                            </h6>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button id='btnYes' onClick={() => onRemoveClick('btnYes')} color='secondary'>
                            Yes
                        </Button>
                        <Button id='btnNo' onClick={() => onRemoveClick('btnNo')} color='primary' autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default RemoveConfirmDialog;
