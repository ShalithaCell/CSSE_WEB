/* eslint-disable consistent-return,no-plusplus,react/destructuring-assignment,max-len */
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { Button } from 'rsuite';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MaterialTable from "material-table";
import DateFnsUtils from '@date-io/date-fns';
import {
    fetchItems,
} from "../../redux/action/itemAction";
import { handleNewOrderDialogStatus } from "../../redux/action/orderAction";
import { fetchSuppliers } from "../../redux/action/supplierAction";
import 'date-fns';

/**
 * order placement dialog
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function NewOrderDialog(props)
{
    const { isEnable } = props;

    // initial state
    const [ item, setItem ] = useState({
        name      : '',
        qty       : '',
        price     : '',
        errorName : '',
        errorQty  : '',
        docID     : null,
    });

    const [ orderID, setOrderID ] = useState(null);

    const [ netAmount, setNetAmount ] = useState(0);

    const [ orderItems, setOrderItems ] = useState([
        { item: 'cement', supplier: 'ABC Store', qty: 200, amount: 0, unitPrice: 200 },
        { item: 'Blocks', supplier: 'ABC Store', qty: 1000, amount: 0, unitPrice: 200 },
    ]);

    const [ qty, setQty ] = useState([]);

    useEffect(() =>
    {
        // set order id
        setOrderID(Date.now());

        async function fetchData()
        {
            // check suppliers are exists
            if (props.supplier.length <= 0)
            {
                // fetch the all suppliers
                await props.fetchSuppliers();
            }
            // fetch the all items
            await props.fetchItems();
        }

        fetchData();
    }, [ isEnable ]);

    function addToCart(rowData)
    {

    }

    return (
        <div>
            <Dialog
                open={isEnable}
                aria-labelledby='form-dialog-title'
                fullWidth
                maxWidth='xl'
            >
                <DialogTitle id='form-dialog-title'>
                    <div className='row'>
                        <div className='col-md-6'>
                            New Order (Ref -
                            {orderID }
                            )
                        </div>

                        <div className='col-md-6 text-right'>
                            Net amount =
                            {' '}
                            {netAmount}
                        </div>

                    </div>

                </DialogTitle>
                <DialogContent>
                    <div className='row'>

                        <div className='col-md-6 border-right'>

                            <MaterialTable
                                title='Find Items'
                                columns={[
                                    { title: 'Item', field: 'name' },
                                    { title: 'Supplier', field: 'supplierName' },
                                    { title: 'Unit Price', field: 'unitPrice' },
                                    { title: 'Availability', field: 'availability' },
                                    {
                                        title  : 'QTY',
                                        // eslint-disable-next-line react/display-name
                                        render : (rowData) => (<TextField
                                            type='number'
                                            fullWidth
                                            onChange={(e) => setQty({
                                                ...qty,
                                                [rowData.id] : e.target.value,
                                            })}
                                        />),
                                    },
                                ]}
                                data={props.itemList.items}
                                actions={[
                                    (rowData) => ({
                                        icon    : 'add',
                                        tooltip : 'Click here to add Item',
                                        onClick : (event, Data) => addToCart(Data),
                                    }),
                                ]}
                                options={{
                                    actionsColumnIndex : -1,
                                    search             : true,
                                    pageSize           : 10,
                                    headerStyle        : {
                                        backgroundColor : '#8898aa',
                                        color           : '#FFF',
                                    },
                                }}
                            />
                        </div>
                        <div className='col-md-6 border-1'>

                            <div className='mt-2'>
                                <InputLabel id='lblSurveyName'>
                                    Address
                                    <span className='text-danger'> *</span>
                                </InputLabel>
                                <TextField
                                    autoFocus
                                    margin='dense'
                                    id='address'
                                    placeholder='enter deliver address'
                                    type='text'
                                    variant='outlined'
                                    // value={item.price}
                                    // onChange={(e) => handleOnTextChange(e)}
                                    // error={supplier.errorEmail.length !== 0}
                                    // helperText={supplier.errorEmail}
                                    fullWidth
                                />
                            </div>

                            <div className='mt-2 mb-3'>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        fullWidth
                                        variant='inline'
                                        format='MM/dd/yyyy'
                                        margin='normal'
                                        id='date-picker-inline'
                                        label='Select Deliver Date'
                                        // value={selectedDate}
                                        // onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label' : 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>

                            <MaterialTable
                                title='Order Items'
                                columns={[
                                    { title: 'Item', field: 'item' },
                                    { title: 'Supplier', field: 'supplier' },
                                    { title: 'Unit Price', field: 'unitPrice' },
                                    { title: 'Qty', field: 'qty' },
                                    { title: 'Amount', field: 'amount' },
                                ]}
                                data={orderItems}
                                actions={[
                                    (rowData) => ({
                                        icon    : 'remove',
                                        tooltip : 'Click here to remove item',
                                        onClick : (event, Data) => addToCart(Data),
                                    }),
                                ]}
                                options={{
                                    actionsColumnIndex : -1,
                                    search             : true,
                                    pageSize           : 5,
                                    headerStyle        : {
                                        backgroundColor : '#055FB3',
                                        color           : '#FFF',
                                    },
                                }}
                            />
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button
                        appearance='ghost'
                        onClick={() => props.handleNewOrderDialogStatus(false, null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color='green'
                        // onClick={() => handleSaving()}
                    >
                        Place Order
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    itemList : state.items,
    supplier : state.supplier.suppliers,
    isEnable : state.system.newOrderDialog,
    editID   : state.system.orderEditableID,
});

export default connect(
    mapStateToProps,
    {
        handleNewOrderDialogStatus,
        fetchItems,
        fetchSuppliers,
    },
)(NewOrderDialog);
