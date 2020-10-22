/* eslint-disable react/jsx-handler-names,jsx-a11y/control-has-associated-label,max-len,no-nested-ternary */
import React from "react";

// reactstrap components
import {
    Badge,
    Card,
    Container,
    Row,
} from "reactstrap";
// core components
import { Button, ButtonToolbar } from 'rsuite';
import { connect } from "react-redux";
import Header from "../../components/Headers/Header";
import { fetchOrders } from "../../redux/action/OrderAction";
import PendingOrders from "../elements/PendingOrders";
import ApprovedOrders from "../elements/ApprovedOrders";
import CompleteOrders from "../elements/CompleteOrders";

/**
 * Orders handling component of te application
 */
class Orders extends React.Component
{
    constructor()
    {
        super();
        this.state = {};
    }

    componentDidMount()
    {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.fetchOrders();
    }

    render()
    {
        const { viewType } = this.props;

        return (
            <>
                <Header />
                {/* Page content */}
                <Container className='mt--7' fluid>
                    {/* Table */}
                    <Row>
                        <div className='col'>
                            <Card className='shadow'>
                                {
                                    viewType === 1
                                        ? <PendingOrders />
                                        : viewType === 2
                                            ? <ApprovedOrders />
                                            : viewType === 3
                                                ? <CompleteOrders />
                                                : <PendingOrders />
                                }

                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    viewType : state.system.viewOrdersType,
});

export default connect(mapStateToProps, { fetchOrders })(Orders);
