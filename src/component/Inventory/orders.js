import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './title';
import { connect } from 'react-redux';
import { getInventoryDetails, updateInventory } from '../../redux/InventoryActions';

const ReceivedOrders= ( props ) => {

	useEffect(() => {
		console.log('success');
		props.getInventoryDetails();

	}, [ 1 ]);

	return (
    <React.Fragment>
        <Title>Recently Received Orders</Title>
        <Table size="large">
            <TableHead>
                <TableRow>
                    <TableCell>Received Date</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                { props.ReceivedOrders.map((row) => (

                    <TableRow key={ row.id }>
                        <TableCell>{row.registedDate}</TableCell>
                        <TableCell>{row.productName}</TableCell>
                        <TableCell>{row.supplireName}</TableCell>
                        <TableCell>{row.qty}</TableCell>
                        <TableCell>{row.unitPrice}</TableCell>
                        <TableCell>{ (row.qty * row.unitPrice) }</TableCell>
                    </TableRow>
					))
					}
            </TableBody>
        </Table>
    </React.Fragment>
	);
}
const mapStateToProps = (state) => ({
	ReceivedOrders : state.inventory.ReceivedOrders
})

export default connect( mapStateToProps, { updateInventory, getInventoryDetails } )( ReceivedOrders );