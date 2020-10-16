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
import Header from "../../components/Headers/Header";
// mapTypeId={google.maps.MapTypeId.ROADMAP}

class Maps extends React.Component
{
    constructor()
    {
        super();
        this.state = {};
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
                                    <h3 className='mb-0'>Card tables</h3>
                                </CardHeader>

                                <CardFooter className='py-4'>

                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Maps;
