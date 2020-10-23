import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import { Badge, Progress } from "reactstrap";
import Moment from 'react-moment';
import { Button, ButtonToolbar } from "rsuite";

function CompleteOrders(props)
{
    const { orders } = props;

    return (
        <div>
            <MaterialTable
                title='Complete Orders'
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
                            <Badge color='' className='badge-dot'>
                                <i className='bg-info' />
                                Complete
                            </Badge>
                        ),
                    },
                    {
                        title  : 'Shipping status',
                        // eslint-disable-next-line react/display-name
                        render : (rowData) => (
                            <div className='d-flex align-items-center'>
                                <span className='mr-2'>Delivered</span>
                                <div>
                                    <Progress
                                        max='100'
                                        value='100'
                                        barClassName='bg-success'
                                    />
                                </div>
                            </div>
                        ),
                    },
                    {
                        title  : 'Action',
                        width  : 300,
                        // eslint-disable-next-line react/display-name
                        render : (rowData) => (
                            <ButtonToolbar>
                                <Button appearance='ghost'>View</Button>
                            </ButtonToolbar>
                        ),
                    },
                ]}
                data={orders.orderHeader.filter((o) => o.status === 3)}
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
)(CompleteOrders);
