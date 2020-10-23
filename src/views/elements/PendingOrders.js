import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import { Badge } from "reactstrap";
import Moment from 'react-moment';
import { Button, ButtonToolbar } from "rsuite";
import { handleViewOrderDialogStatus } from "../../redux/action/OrderAction";

function PendingOrders(props)
{
    const { orders } = props;

    function handleViewOrder(rowData)
    {
        props.handleViewOrderDialogStatus(true, rowData);
    }

    return (
        <div>
            <MaterialTable
                title='Pending Orders'
                columns={[
                    { title: 'Reference ID', field: 'referenceID' },
                    { title: 'Supplier', field: 'supplierName' },
                    { title: 'Address', field: 'address' },
                    { title: 'Budget (Rs)', field: 'amount' },
                    // { title: 'Deliver Date', field: 'dueDate' },
                    {
                        title  : 'Deliver Date',
                        // eslint-disable-next-line react/display-name
                        render : (rowData) => (
                            <Moment format='YYYY/MM/DD' date={new Date(rowData.dueDate.toDate())} />
                        ),
                    },
                    {
                        title  : 'Status',
                        // eslint-disable-next-line react/display-name
                        render : (rowData) => (
                            <Badge color='' className='badge-dot mr-4'>
                                <i className='bg-warning' />
                                pending
                            </Badge>
                        ),
                    },
                    {
                        title  : 'Action',
                        width  : 300,
                        // eslint-disable-next-line react/display-name
                        render : (rowData) => (
                            <ButtonToolbar>
                                <Button
                                    appearance='ghost'
                                    onClick={() => handleViewOrder(rowData)}
                                >
                                    Approve
                                </Button>
                                <Button color='red'>Discard</Button>
                            </ButtonToolbar>
                        ),
                    },
                ]}
                data={orders.orderHeader.filter((o) => o.status === 1)}
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
    );
}

const mapStateToProps = (state) => ({
    orders : state.orders,
});

export default connect(
    mapStateToProps,
    {
        handleViewOrderDialogStatus,
    },
)(PendingOrders);
