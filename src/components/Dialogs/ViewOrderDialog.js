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
    fetchOrders,
    handleViewOrderDialogStatus,
    handleViewPaymentDialogStatus,
    updateOrderStatus,
} from "../../redux/action/OrderAction";
import 'date-fns';

/**
 * order view dialog
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ViewOrderDialog(props)
{
    const { isEnable } = props;

    // order reference id
    const [ orderID, setOrderID ] = useState(null);

    // order net amount
    const [ netAmount, setNetAmount ] = useState(0);

    // cart details
    const [ orderItems, setOrderItems ] = useState([]);

    // address
    const [ address, setAddress ] = useState('');

    // due date
    const [ dueDate, setDueDate ] = useState(Date.now);

    // back to previous
    function handleBack()
    {
        setOrderID(null);
        setNetAmount(0);
        setOrderItems([]);
        props.handleViewOrderDialogStatus(false, null);
    }

    useEffect(() =>
    {
        if (props.editDetails !== null)
        {
            setOrderID(props.editDetails.referenceID);

            setDueDate(new Date(props.editDetails.dueDate.toDate()));

            setAddress(props.editDetails.address);

            const itemList = props.orderItems.filter((i) => i.OrderID === props.editDetails.id);

            itemList.map((i) =>
            {
                const item = props.itemList.filter((s) => s.id === i.itemID);

                const cartObj = {
                    id        : i.OrderID,
                    item      : item[0].name,
                    supplier  : props.editDetails.supplierName,
                    unitPrice : i.unitPrice,
                    qty       : i.qty,
                    amount    : (Number(i.unitPrice) * Number(i.qty)),
                };

                setNetAmount(netAmount + Number(cartObj.amount));

                setOrderItems([
                    ...orderItems,
                    cartObj,
                ]);

                return i;
            });
        }
    }, [ isEnable ]);

    function handleOnApprove()
    {
        const paymentObj = {
            orderItems,
            netAmount,
            orderID,
            address,
            dueDate,
        };

        props.handleViewPaymentDialogStatus(true, paymentObj);
        handleBack();
    }

    function handleOnDiscard()
    {
        props.updateOrderStatus(orderItems[0].id, 0);
        handleBack();
        props.fetchOrders();
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
                            Order (Ref -
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
                        <div className='col-md-12 border-1'>

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
                                    disabled
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
                        className='mr-3'
                    >
                        Cancel
                    </Button>
                    <Button
                        color='red'
                        className='mr-3'
                        // onClick={() => handleOnPlaceOrder()}
                    >
                        Discard
                    </Button>
                    <Button
                        color='green'
                        onClick={() => handleOnApprove()}
                    >
                        Approve
                    </Button>
                </DialogActions>
                <ToastContainer />
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isEnable    : state.system.viewOrderDialog,
    editDetails : state.system.viewOrderDetails,
    orderItems  : state.orders.orderItems,
    supplier    : state.supplier.suppliers,
    itemList    : state.items.items,
});

export default connect(
    mapStateToProps,
    {
        fetchOrders,
        handleViewOrderDialogStatus,
        handleViewPaymentDialogStatus,
        updateOrderStatus,
    },
)(ViewOrderDialog);
