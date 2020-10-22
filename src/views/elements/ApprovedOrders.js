import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import { Badge, Progress } from "reactstrap";
import Moment from 'react-moment';
import { Button, ButtonToolbar } from "rsuite";

function ApprovedOrders(props)
{
    const { orders } = props;

    return (
        <div>
            <MaterialTable
                title='Approved Orders'
                columns={[
                    { title: 'Reference ID', field: 'referenceID' },
                    { title: 'Supplier', field: 'supplierName' },
                    { title: 'Address', field: 'address' },
                    { title: 'Budget (Rs)', field: 'amount' },
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
                            <Badge color='' className='badge-dot'>
                                <i className='bg-success' />
                                Approved
                            </Badge>
                        ),
                    },
                    {
                        title  : 'Shipping status',
                        // eslint-disable-next-line react/display-name
                        render : (rowData) => (
                            <div className='d-flex align-items-center'>
                                <span className='mr-2'>Shipped</span>
                                <div>
                                    <Progress
                                        max='100'
                                        value='100'
                                        barClassName='bg-info'
                                    />
                                </div>
                            </div>
                        ),
                    },
                    {
                        title  : 'Status',
                        width  : 300,
                        // eslint-disable-next-line react/display-name
                        render : (rowData) => (
                            <Button appearance='ghost'>View</Button>
                        ),
                    },
                ]}
                data={orders.orderHeader.filter((o) => o.status === 2)}
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
    null,
)(ApprovedOrders);
