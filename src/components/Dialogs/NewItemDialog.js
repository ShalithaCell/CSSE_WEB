/* eslint-disable consistent-return,no-plusplus,react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { Button, SelectPicker } from 'rsuite';
import {
    handleItemAddDialogStatus,
    addNewItem,
    fetchItems,
} from "../../redux/action/ItemAction";

/**
 * item add dialog
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function NewItemDialog(props)
{
    // dialog enabled
    const { isEnable } = props;

    // initial items
    const [ item, setItem ] = useState({
        name      : '',
        qty       : '',
        price     : '',
        errorName : '',
        errorQty  : '',
        docID     : null,
    });

    // suppliers
    const [ supplierList, setSupplierList ] = useState({
        list : [],
    });

    // selected suppliers
    const [ selectedSupplier, setSelectedSupplier ] = useState(null);

    useEffect(() =>
    {
        // if (props.editID != null)
        // {
        //     setItem(
        //         {
        //             ...item,
        //             name          : props.editID.name,
        //             location      : props.editID.location,
        //             email         : props.editID.email,
        //             contact       : props.editID.contactNumber,
        //             errorName     : '',
        //             errorLocation : '',
        //             errorEmail    : '',
        //             errorContact  : '',
        //             docID         : props.editID.id,
        //         },
        //     );
        // }

        generateSupplierList();
    }, [ props.supplier ]);

    /**
     * set to initial state
     */
    function backToInitialState()
    {
        setItem({
            name      : '',
            qty       : '',
            price     : '',
            errorName : '',
            errorQty  : '',
            docID     : null,
        });
    }

    /**
     * Generate supplier list as label value object array
     */
    function generateSupplierList()
    {
        const objSuppliers = [];

        const { supplier } = props;

        supplier.map((s) =>
        {
            objSuppliers.push({ label: s.name, value: s.id });

            return s;
        });

        setSupplierList({ list: objSuppliers });
    }

    /**
     * handle text changing events
     * @param e
     */
    function handleOnTextChange(e)
    {
        e.preventDefault();

        setItem(
            {
                ...item,
                [e.target.id] : e.target.value,
            },
        );
    }

    /**
     * validating and saving functionality
     * @returns {Promise<void>}
     */
    async function handleSaving()
    {
        // object to be saved in database
        const fireStoreObject = {
            availability : true,
            supplier     : selectedSupplier,
            qty          : item.qty,
            unitPrice    : item.price,
            name         : item.name,
        };

        // check this is in the edit mode or not
        if (props.editID === null)
        {
            await props.addNewItem(fireStoreObject);
        }
        else
        {
            // await props.updateSupplier(fireStoreObject, supplier.docID);
        }

        // dialog closing
        props.handleItemAddDialogStatus(false, null);
        // refresh the items
        props.fetchItems();

        backToInitialState();
    }

    return (
        <div>
            <Dialog
                open={isEnable}
                aria-labelledby='form-dialog-title'
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle id='form-dialog-title'>New Item</DialogTitle>
                <DialogContent>
                    <div>
                        <InputLabel id='lblItemName'>
                            Item name
                            <span className='text-danger'> *</span>
                        </InputLabel>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            placeholder='Item name'
                            type='text'
                            variant='outlined'
                            value={item.name}
                            onChange={(e) => handleOnTextChange(e)}
                            // error={supplier.errorName.length !== 0}
                            // helperText={supplier.errorName}
                            fullWidth
                        />
                    </div>
                    <div className='mt-2'>
                        <InputLabel id='lblSurveyName'>
                            Supplier
                            <span className='text-danger'> *</span>
                        </InputLabel>
                        <SelectPicker
                            data={supplierList.list}
                            value={selectedSupplier}
                            onChange={(value, event) => setSelectedSupplier(value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className='mt-2'>
                        <InputLabel id='lblSurveyName'>
                            Unit Price
                            <span className='text-danger'> *</span>
                        </InputLabel>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='price'
                            placeholder='Unit Price'
                            type='number'
                            variant='outlined'
                            value={item.price}
                            onChange={(e) => handleOnTextChange(e)}
                            // error={supplier.errorEmail.length !== 0}
                            // helperText={supplier.errorEmail}
                            fullWidth
                        />
                    </div>
                    <div className='mt-2'>
                        <InputLabel id='lblSurveyName'>
                            QTY
                        </InputLabel>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='qty'
                            placeholder='qty'
                            type='number'
                            variant='outlined'
                            value={item.qty}
                            onChange={(e) => handleOnTextChange(e)}
                            fullWidth
                        />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button
                        appearance='ghost'
                        onClick={() => props.handleItemAddDialogStatus(false, null)}
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
    supplier : state.supplier.suppliers,
    isEnable : state.system.newItemDialog,
    editID   : state.system.ItemEditableID,
});

export default connect(
    mapStateToProps,
    {
        handleItemAddDialogStatus,
        addNewItem,
        fetchItems,
    },
)(NewItemDialog);
