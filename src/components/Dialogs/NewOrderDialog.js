/* eslint-disable consistent-return,no-plusplus,react/destructuring-assignment,max-len,array-callback-return */
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
import { ToastContainer, toast } from 'react-toastify';
import {
    fetchItems,
} from "../../redux/action/ItemAction";
import { handleNewOrderDialogStatus, addNewOrder, fetchOrders } from "../../redux/action/OrderAction";
import { fetchSuppliers } from "../../redux/action/SupplierAction";
import syncConfigurations from "../../redux/action/ConfigurationActions";
import 'date-fns';

/**
 * order placement dialog
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function NewOrderDialog(props)
{
    const { isEnable, configurations } = props;

    // initial state for items
    const [ item, setItem ] = useState({
        name      : '',
        qty       : '',
        price     : '',
        errorName : '',
        errorQty  : '',
        docID     : null,
    });

    // order reference id
    const [ orderID, setOrderID ] = useState(null);

    // order net amount
    const [ netAmount, setNetAmount ] = useState(0);

    // cart details
    const [ orderItems, setOrderItems ] = useState([]);

    // qty object array
    const [ qty, setQty ] = useState([]);

    // address
    const [ address, setAddress ] = useState('');

    // due date
    const [ dueDate, setDueDate ] = useState(Date.now);

    useEffect(() =>
    {
        // set order id
        setOrderID(Date.now());

        props.syncConfigurations();

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

        setOrderID(null);
        setNetAmount(0);
        setOrderItems([]);
        setQty([]);
        setAddress('');
    }

    /**
     * add item to the cart
     * @param rowData
     */
    function addToCart(rowData)
    {
        let selectedQty = 0;

        // check whether the item has qty
        if (qty.hasOwnProperty(rowData.id))
        {
            selectedQty = Number(qty[rowData.id]);
        }
        else
        {
            // display error message
            toast.error('Please enter amount.', {
                position        : "top-right",
                autoClose       : 5000,
                hideProgressBar : false,
                closeOnClick    : true,
                pauseOnHover    : true,
                draggable       : true,
                progress        : undefined,
            });

            return;
        }

        if (orderItems.length > 0)
        {
            if (orderItems[0].supplierID !== rowData.supplier)
            {
                toast.warn('Please select same supplier items for same order.', {
                    position        : "top-right",
                    autoClose       : 5000,
                    hideProgressBar : false,
                    closeOnClick    : true,
                    pauseOnHover    : true,
                    draggable       : true,
                    progress        : true,
                });

                return;
            }
        }

        // calculate amount
        const amount = selectedQty * Number(rowData.unitPrice);

        setNetAmount(netAmount + amount);

        const cartObj = {
            id         : rowData.id,
            item       : rowData.name,
            supplier   : rowData.supplierName,
            supplierID : rowData.supplier,
            unitPrice  : rowData.unitPrice,
            qty        : selectedQty,
            amount,
        };

        setOrderItems([
            ...orderItems,
            cartObj,
        ]);
    }

    /**
     * remove selected item to the cart
     * @param itemID
     */
    function handleOnItemRemove(itemID)
    {
        // filter the item
        const removedItem = orderItems.filter((i) => i.id !== itemID);

        // check whether the item is exists
        if (removedItem.length > 0)
        {
            // reduce the net amount
            setNetAmount(netAmount - Number(removedItem[0].amount));
        }
        // remove item from the cart
        const obj = orderItems.filter((i) => i.id !== itemID);

        setOrderItems(obj);
    }

    /**
     *  validate order and save to the DB
     */
    function handleOnPlaceOrder()
    {
        if (address.length === 0) return;

        if (orderItems.length === 0)
        {
            toast.warn('Please select at least 1 item to place order', {
                position        : "top-right",
                autoClose       : 5000,
                hideProgressBar : false,
                closeOnClick    : true,
                pauseOnHover    : true,
                draggable       : true,
                progress        : true,
            });

            return;
        }

        if (address.length === 0)
        {
            toast.warn('Please select date', {
                position        : "top-right",
                autoClose       : 5000,
                hideProgressBar : false,
                closeOnClick    : true,
                pauseOnHover    : true,
                draggable       : true,
                progress        : true,
            });

            return;
        }

        // calculate the min amount
        const minAmount = configurations.filter((f) => f.id === 'minAmount')[0].amount;

        const orderObj = {
            address,
            amount       : netAmount,
            dueDate,
            status       : minAmount < netAmount ? 1 : 2,
            supplier     : orderItems[0].supplierID,
            referenceID  : orderID,
            supplierName : orderItems[0].supplier,
        };

        // place th order
        props.addNewOrder(orderObj, orderItems);

        backToInitialState();
        props.fetchOrders();
        props.handleNewOrderDialogStatus(false, null);
    }

    function handleBack()
    {
        backToInitialState();

        props.handleNewOrderDialogStatus(false, null);
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    error={address.length === 0}
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
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e)}
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
                                        onClick : (event, Data) => handleOnItemRemove(Data.id),
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
                        onClick={() => handleBack()}
                    >
                        Cancel
                    </Button>
                    <Button
                        color='green'
                        onClick={() => handleOnPlaceOrder()}
                    >
                        Place Order
                    </Button>
                </DialogActions>
                <ToastContainer />
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    itemList       : state.items,
    supplier       : state.supplier.suppliers,
    isEnable       : state.system.newOrderDialog,
    editID         : state.system.orderEditableID,
    configurations : state.configurations.configurations,
});

export default connect(
    mapStateToProps,
    {
        handleNewOrderDialogStatus,
        fetchItems,
        fetchSuppliers,
        syncConfigurations,
        addNewOrder,
        fetchOrders,
    },
)(NewOrderDialog);
