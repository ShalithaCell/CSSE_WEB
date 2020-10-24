/* eslint-disable react/destructuring-assignment,max-len */
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { handleNewOrderDialogStatus, handleViewOrderType, fetchOrders } from "../../redux/action/OrderAction";
import ViewOrderEnum from "../../redux/actionTypes";

class Header extends React.Component
{
    constructor()
    {
        super();
        this.state = {};
    }

    componentDidMount()
    {
        this.props.fetchOrders();
    }

    render()
    {
        const { orders } = this.props;

        return (
            <>
                <div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
                    <Container fluid>
                        <div className='header-body'>
                            {/* Card stats */}
                            <Row>
                                <Col
                                    lg='6'
                                    xl='3'
                                >
                                    <Card
                                        className='card-stats mb-4 mb-xl-0'
                                        onClick={() => this.props.handleViewOrderType(1)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <CardBody>
                                            <Row>
                                                <div className='col'>
                                                    <CardTitle
                                                        tag='h5'
                                                        className='text-uppercase text-muted mb-0'
                                                    >
                                                        Pending Orders
                                                    </CardTitle>
                                                    <span className='h2 font-weight-bold mb-0'>
                                                        { orders.filter((i) => i.status === 1).length }
                                                    </span>
                                                </div>
                                                <Col className='col-auto'>
                                                    <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                                                        <i className='fas fa-pause' />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className='mt-3 mb-0 text-muted text-sm'>
                                                <span className='text-success mr-2'>
                                                    <i className='fa fa-arrow-up' />
                                                    {' '}
                                                    { orders.filter((i) => i.status === 1).reduce((cnt, o) => cnt + o.amount, 0)}
                                                </span>
                                                {" "}
                                                <span className='text-nowrap'>budget</span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg='6' xl='3'>
                                    <Card
                                        className='card-stats mb-4 mb-xl-0'
                                        onClick={() => this.props.handleViewOrderType(2)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <CardBody>
                                            <Row>
                                                <div className='col'>
                                                    <CardTitle
                                                        tag='h5'
                                                        className='text-uppercase text-muted mb-0'
                                                    >
                                                        Approved Orders
                                                    </CardTitle>
                                                    <span className='h2 font-weight-bold mb-0'>
                                                        { orders.filter((i) => i.status === 2).length }
                                                    </span>
                                                </div>
                                                <Col className='col-auto'>
                                                    <div className='icon icon-shape bg-success text-white rounded-circle shadow'>
                                                        <i className='fas fa-check' />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className='mt-3 mb-0 text-muted text-sm'>
                                                <span className='text-success mr-2'>
                                                    <i className='fas fa-arrow-up' />
                                                    {' Rs '}
                                                    { orders.filter((i) => i.status === 2).reduce((cnt, o) => cnt + o.amount, 0)}
                                                </span>
                                                {" "}
                                                <span className='text-nowrap'>budget</span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg='6' xl='3'>
                                    <Card
                                        className='card-stats mb-4 mb-xl-0'
                                        onClick={() => this.props.handleViewOrderType(3)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <CardBody>
                                            <Row>
                                                <div className='col'>
                                                    <CardTitle
                                                        tag='h5'
                                                        className='text-uppercase text-muted mb-0'
                                                    >
                                                        Complete Orders
                                                    </CardTitle>
                                                    <span className='h2 font-weight-bold mb-0'>
                                                        { orders.filter((i) => i.status === 3).length }
                                                    </span>
                                                </div>
                                                <Col className='col-auto'>
                                                    <div className='icon icon-shape bg-yellow text-white rounded-circle shadow'>
                                                        <i className='fas fa-certificate' />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className='mt-3 mb-0 text-muted text-sm'>
                                                <span className='text-success mr-2'>
                                                    <i className='fas fa-arrow-up' />
                                                    {' '}
                                                    { orders.filter((i) => i.status === 3).reduce((cnt, o) => cnt + o.amount, 0)}
                                                </span>
                                                {" "}
                                                <span className='text-nowrap'>budget</span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg='6' xl='3'>
                                    <Card
                                        className='card-stats mb-4 mb-xl-0'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => this.props.handleNewOrderDialogStatus(true, null)}
                                    >
                                        <CardBody>
                                            <Row>
                                                <div className='col'>
                                                    <CardTitle
                                                        tag='h5'
                                                        className='text-uppercase text-muted mb-0'
                                                    >
                                                        New Order
                                                    </CardTitle>
                                                    <span className='h2 font-weight-bold mb-0 text-white'>
                                                        49,65%
                                                    </span>
                                                </div>
                                                <Col className='col-auto'>
                                                    <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
                                                        <i className='fas fa-plus' />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className='mt-3 mb-0 text-muted text-sm'>
                                                <span className='text-warning mr-2'>
                                                    <i className='fas fa-arrow-down' />
                                                    {' '}
                                                    Rs 100000.00
                                                </span>
                                                {" "}
                                                <span className='text-nowrap'>Auto approval limit</span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    viewType : state.system.viewOrdersType,
    orders   : state.orders.orderHeader,
});

export default connect(mapStateToProps,
    {
        handleNewOrderDialogStatus,
        handleViewOrderType,
        fetchOrders,
    })(Header);
