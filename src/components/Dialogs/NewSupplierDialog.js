/* eslint-disable consistent-return,no-plusplus,react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { Button } from 'rsuite';
import { handleSupplierAddDialogStatus,
    addNewSupplier,
    fetchSuppliers,
    updateSupplier,
} from "../../redux/action/SupplierAction";

/**
 * add new supplier dialog
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function NewSupplierDialog(props)
{
    const { isEnable } = props;

    // initial state
    const [ supplier, setSupplier ] = useState({
        name          : '',
        location      : '',
        email         : '',
        contact       : '',
        errorName     : '',
        errorLocation : '',
        errorEmail    : '',
        errorContact  : '',
        docID         : null,
    });

    useEffect(() =>
    {
        if (props.editID != null)
        {
            setSupplier(
                {
                    ...supplier,
                    name          : props.editID.name,
                    location      : props.editID.location,
                    email         : props.editID.email,
                    contact       : props.editID.contactNumber,
                    errorName     : '',
                    errorLocation : '',
                    errorEmail    : '',
                    errorContact  : '',
                    docID         : props.editID.id,
                },
            );
        }
    }, [ props.editID ]);

    // all text-box text change handle event
    function handleOnTextChange(e)
    {
        e.preventDefault();

        setSupplier(
            {
                ...supplier,
                [e.target.id] : e.target.value,
            },
        );
    }

    // validating the data
    function validating()
    {
        const error = {
            name     : '',
            location : '',
            email    : '',
        };

        let counter = 0;

        if (supplier.name.length <= 0)
        {
            error.name = 'name is required';
            counter++;
        }
        else
        {
            error.name = '';
        }

        if (supplier.location.length <= 0)
        {
            error.location = 'location is required';
            counter++;
        }
        else
        {
            error.location = '';
        }

        if (supplier.email.length <= 0)
        {
            // eslint-disable-next-line no-nested-ternary
            error.email = supplier.email.length <= 0 ? 'email is required'
                : (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(supplier.email)) ? ''
                    : 'email address is invalid !';
            counter++;
        }
        else
        {
            error.email = '';
        }

        setSupplier(
            {
                ...supplier,
                errorName     : error.name,
                errorLocation : error.location,
                errorEmail    : error.email,
            },
        );

        if (counter === 0) return true;
        else
        { return false; }
    }

    // database saving method
    async function handleSaving()
    {
        // check data is valid
        if (!validating())
        {
            return;
        }

        // data to be saved
        const fireStoreObject = {
            userID        : '1234',
            availability  : true,
            contactNumber : supplier.contact,
            email         : supplier.email,
            location      : supplier.location,
            name          : supplier.name,
        };

        if (props.editID === null)
        {
            await props.addNewSupplier(fireStoreObject);
        }
        else
        {
            await props.updateSupplier(fireStoreObject, supplier.docID);
        }

        props.handleSupplierAddDialogStatus(false);
        props.fetchSuppliers();
    }

    return (
        <div>
            <Dialog
                open={isEnable}
                aria-labelledby='form-dialog-title'
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle id='form-dialog-title'>New Supplier</DialogTitle>
                <DialogContent>
                    <div>
                        <InputLabel id='lblSurveyName'>
                            Name
                            <span className='text-danger'> *</span>
                        </InputLabel>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            placeholder='Name'
                            type='text'
                            variant='outlined'
                            value={supplier.name}
                            onChange={(e) => handleOnTextChange(e)}
                            error={supplier.errorName.length !== 0}
                            helperText={supplier.errorName}
                            fullWidth
                        />
                    </div>
                    <div className='mt-2'>
                        <InputLabel id='lblSurveyName'>
                            Location
                            <span className='text-danger'> *</span>
                        </InputLabel>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='location'
                            placeholder='Location'
                            type='text'
                            variant='outlined'
                            value={supplier.location}
                            onChange={(e) => handleOnTextChange(e)}
                            error={supplier.errorLocation.length !== 0}
                            helperText={supplier.errorLocation}
                            fullWidth
                        />
                    </div>
                    <div className='mt-2'>
                        <InputLabel id='lblSurveyName'>
                            Email
                            <span className='text-danger'> *</span>
                        </InputLabel>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='email'
                            placeholder='Email'
                            type='email'
                            variant='outlined'
                            value={supplier.email}
                            onChange={(e) => handleOnTextChange(e)}
                            error={supplier.errorEmail.length !== 0}
                            helperText={supplier.errorEmail}
                            fullWidth
                        />
                    </div>
                    <div className='mt-2'>
                        <InputLabel id='lblSurveyName'>
                            Contact Number
                        </InputLabel>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='contact'
                            placeholder='Contact number'
                            type='email'
                            variant='outlined'
                            value={supplier.contact}
                            onChange={(e) => handleOnTextChange(e)}
                            fullWidth
                        />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button
                        appearance='ghost'
                        onClick={() => props.handleSupplierAddDialogStatus(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color='green'
                        onClick={() => handleSaving()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isEnable : state.system.newSupplierDialog,
    editID   : state.system.supplierEditableID,
});

export default connect(
    mapStateToProps,
    { handleSupplierAddDialogStatus,
        addNewSupplier,
        fetchSuppliers,
        updateSupplier,
    },
)(NewSupplierDialog);
