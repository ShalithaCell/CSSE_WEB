/* eslint-disable react/destructuring-assignment,max-len */
import React from "react";
// react plugin used to create google maps
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

// reactstrap components
import {
    Badge,
    Card, CardFooter,
    CardHeader,
    Container, DropdownItem, DropdownMenu, DropdownToggle,
    Media, Pagination, PaginationItem, PaginationLink,
    Progress,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip,
} from "reactstrap";

// core components
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { Button } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Headers/Header";

import {
    fetchSuppliers,
    handleSupplierAddDialogStatus,
    removeSupplier,
} from "../../redux/action/SupplierAction";
import { DIALOG_NEW_SUPPLIER } from "../../redux/actionTypes";
import RemoveConfirmDialog from "../../components/Dialogs/RemoveConfirmDialog";

/**
 * Supplier management component of the application
 */
class Suppliers extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            popupDelete : false,
            docID       : null,
            removeItem  : '',
        };

        // eslint-disable-next-line react/destructuring-assignment
        this.props.fetchSuppliers();
    }

    handleOnRemoveClick = async (id) =>
    {
        if (id === 'btnNo')
        {
            this.setState({
                popupDelete : false,
            });

            return;
        }

        await this.props.removeSupplier(this.state.docID);

        this.setState({
            popupDelete : false,
        });

        this.props.fetchSuppliers();
    }

    render()
    {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className='mt--7' fluid>
                    <Row>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='border-0'>
                                    <div className='row col-md-12 form-inline'>
                                        <div className='col-md-10'>
                                            <h3 className='mb-0 float-left'>Suppliers List</h3>
                                        </div>
                                        <div className='col-md-2'>
                                            <Button
                                                className='float-right'
                                                color='green'
                                                onClick={() => this.props.handleSupplierAddDialogStatus(true, null)}
                                            >
                                                New supplier
                                                {' '}
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </div>
                                    </div>

                                </CardHeader>
                                <MaterialTable
                                    title=''
                                    columns={[
                                        { title: 'Supplier', field: 'name' },
                                        { title: 'Email', field: 'email' },
                                        { title: 'Location', field: 'location' },
                                        { title: 'Contact', field: 'contactNumber' },
                                        { title: 'Availability', field: 'availability' },
                                    ]}
                                    data={this.props.supplier.suppliers}
                                    actions={[
                                        (rowData) => ({
                                            icon    : 'edit',
                                            tooltip : 'Click here to edit supplier',
                                            onClick : (event, Data) => this.props.handleSupplierAddDialogStatus(true, Data),
                                            // disabled : !rowData.modifyAllowed
                                        }),
                                        (rowData) => ({
                                            icon    : 'delete',
                                            tooltip : 'Click here to remove supplier',
                                            onClick : (event, Data) => this.setState(
                                                {
                                                    popupDelete : true,
                                                    docID       : Data.id,
                                                    removeItem  : Data.name,
                                                },
                                            ),
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
                <RemoveConfirmDialog popupDelete={this.state.popupDelete} item={this.state.removeItem} onRemoveClick={this.handleOnRemoveClick} />
            </>
        );
    }
}

const mapStateToProps = (state, dispatch) => ({
    supplier : state.supplier,
});

export default connect(
    mapStateToProps,
    {
        handleSupplierAddDialogStatus,
        fetchSuppliers,
        removeSupplier,
    },
)(Suppliers);
