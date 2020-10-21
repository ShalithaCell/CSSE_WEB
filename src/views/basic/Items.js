/* eslint-disable react/jsx-handler-names,react/destructuring-assignment,max-len */
import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    UncontrolledTooltip, CardFooter,
} from "reactstrap";
// core components
import { Button } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import Header from "../../components/Headers/Header";
import { fetchItems, handleItemAddDialogStatus } from "../../redux/action/ItemAction";
import { fetchSuppliers } from "../../redux/action/SupplierAction";
import NewSupplierDialog from "../../components/Dialogs/NewSupplierDialog";

/**
 * Component for handle Items of the system
 */
class Items extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { isEnable: false };
    }

    async componentDidMount()
    {
        // check suppliers are exists
        if (this.props.supplier.length <= 0)
        {
            // fetch the all suppliers
            await this.props.fetchSuppliers();
        }
        // fetch the all items
        await this.props.fetchItems();
    }

    render()
    {
        const { items } = this.props.itemList;

        return (
            <>
                <Header />
                {/* Page content */}
                <Container className=' mt--7' fluid>
                    {/* Table */}
                    <Row>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='border-0'>
                                    <div className='row col-md-12 form-inline'>
                                        <div className='col-md-10'>
                                            <h3 className='mb-0 float-left'>Item List</h3>
                                        </div>
                                        <div className='col-md-2'>
                                            <Button
                                                className='float-right'
                                                color='green'
                                                onClick={() => this.props.handleItemAddDialogStatus(true, null)}
                                            >
                                                New Item
                                                {' '}
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </div>
                                    </div>

                                </CardHeader>
                                <MaterialTable
                                    title=''
                                    columns={[
                                        { title: 'Item', field: 'name' },
                                        { title: 'Supplier', field: 'supplierName' },
                                        { title: 'Unit Price', field: 'unitPrice' },
                                        { title: 'Qty', field: 'qty' },
                                        { title: 'Availability', field: 'availability' },
                                    ]}
                                    data={items}
                                    actions={[
                                        (rowData) => ({
                                            icon    : 'edit',
                                            tooltip : 'Click here to edit Item',
                                            // onClick : (event, Data) => this.props.handleSupplierAddDialogStatus(true, Data),
                                            // disabled : !rowData.modifyAllowed
                                        }),
                                        (rowData) => ({
                                            icon    : 'delete',
                                            tooltip : 'Click here to remove Item',
                                            // onClick : (event, Data) => this.setState(
                                            //     {
                                            //         popupDelete : true,
                                            //         docID       : Data.id,
                                            //         removeItem  : Data.name,
                                            //     },
                                            // ),
                                            // disabled : !rowData.modifyAllowed
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
                                <CardFooter className='py-4' />
                            </Card>
                        </div>
                    </Row>
                </Container>
                <NewSupplierDialog isEnable={this.state.isEnable} />
            </>
        );
    }
}

const mapStateToProps = (state, dispatch) => ({
    itemList : state.items,
    supplier : state.supplier.suppliers,
});

export default connect(mapStateToProps,
    {
        fetchItems,
        fetchSuppliers,
        handleItemAddDialogStatus,
    })(Items);
