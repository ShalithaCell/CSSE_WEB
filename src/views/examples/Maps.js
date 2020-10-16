/* eslint-disable react/destructuring-assignment */
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
import Button from '@material-ui/core/Button';
import Header from "../../components/Headers/Header";

import { fetchSuppliers } from "../../redux/action/supplierAction";

class Maps extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};

        // eslint-disable-next-line react/destructuring-assignment
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
                                    <h3 className='mb-0'>Suppliers List</h3>
                                    <Button variant='outlined' color='primary'>
                                        Primary
                                    </Button>
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
                                    options={{
                                        actionsColumnIndex : -1,
                                        search             : true,
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
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    supplier : state.supplier,
});

export default connect(mapStateToProps, { fetchSuppliers })(Maps);
