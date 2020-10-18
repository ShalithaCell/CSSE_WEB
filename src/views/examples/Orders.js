/* eslint-disable react/jsx-handler-names,jsx-a11y/control-has-associated-label,max-len */
import React from "react";

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
} from "reactstrap";
// core components
import { Button, ButtonToolbar } from 'rsuite';
import { connect } from "react-redux";
import Header from "../../components/Headers/Header";

class Orders extends React.Component
{
    constructor()
    {
        super();
        this.state = {};
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
                    <Row className={viewType === 1 ? '' : 'hide'}>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='border-0'>
                                    <h3 className='mb-0'>Pending Orders</h3>
                                </CardHeader>
                                <Table className='align-items-center table-flush' responsive>
                                    <thead className='thead-light'>
                                        <tr>
                                    <th scope='col'>Reference No</th>
                                    <th scope='col'>Budget</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'># of Items</th>
                                    <th scope='col' />
                                </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            123456789
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>Rs 3500000</td>
                                    <td>
                                                <Badge color='' className='badge-dot mr-4'>
                                                    <i className='bg-warning' />
                                                    pending
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            4
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                    <Button color='green'>Approve</Button>
                                                    <Button color='red'>Cancel</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            123456789
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>Rs 3500000</td>
                                    <td>
                                                <Badge color='' className='badge-dot mr-4'>
                                                    <i className='bg-warning' />
                                                    pending
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            4
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                    <Button color='green'>Approve</Button>
                                                    <Button color='red'>Cancel</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            123456789
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>Rs 3500000</td>
                                    <td>
                                                <Badge color='' className='badge-dot mr-4'>
                                                    <i className='bg-warning' />
                                                    pending
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            4
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                    <Button color='green'>Approve</Button>
                                                    <Button color='red'>Cancel</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            123456789
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>Rs 3500000</td>
                                    <td>
                                                <Badge color='' className='badge-dot mr-4'>
                                                    <i className='bg-warning' />
                                                    pending
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            4
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                    <Button color='green'>Approve</Button>
                                                    <Button color='red'>Cancel</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            123456789
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>Rs 3500000</td>
                                    <td>
                                                <Badge color='' className='badge-dot mr-4'>
                                                    <i className='bg-warning' />
                                                    pending
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            4
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                    <Button color='green'>Approve</Button>
                                                    <Button color='red'>Cancel</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                    </tbody>
                                </Table>
                                <CardFooter className='py-4'>
                                    <nav aria-label='...'>
                                        <Pagination
                                    className='pagination justify-content-end mb-0'
                                    listClassName='justify-content-end mb-0'
                                >
                                    <PaginationItem className='disabled'>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                    tabIndex='-1'
                                                >
                                                    <i className='fas fa-angle-left' />
                                                    <span className='sr-only'>Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem className='active'>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    2
                                                    {' '}
                                                    <span className='sr-only'>(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className='fas fa-angle-right' />
                                                    <span className='sr-only'>Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                    <Row className={viewType === 2 ? '' : 'hide'}>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='border-0'>
                                    <h3 className='mb-0'>Approved Orders</h3>
                                </CardHeader>
                                <Table className='align-items-center table-flush' responsive>
                                    <thead className='thead-light'>
                                        <tr>
                                    <th scope='col'>Reference No</th>
                                    <th scope='col'>Budget</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'># of Items</th>
                                    <th scope='col'>Shipping Status</th>
                                    <th scope='col' />
                                </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-success' />
                                                    Approved
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
                                                <div className='d-flex align-items-center'>
                                                    <span className='mr-2'>Shipped</span>
                                                    <div>
                                                        <Progress
                                                            max='100'
                                                            value='50'
                                                            barClassName='bg-info'
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-success' />
                                                    Approved
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
                                                <div className='d-flex align-items-center'>
                                                    <span className='mr-2'>Shipped</span>
                                                    <div>
                                                        <Progress
                                                            max='100'
                                                            value='50'
                                                            barClassName='bg-info'
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-success' />
                                                    Approved
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
                                                <div className='d-flex align-items-center'>
                                                    <span className='mr-2'>Shipped</span>
                                                    <div>
                                                        <Progress
                                                            max='100'
                                                            value='50'
                                                            barClassName='bg-info'
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-success' />
                                                    Approved
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
                                                <div className='d-flex align-items-center'>
                                                    <span className='mr-2'>Shipped</span>
                                                    <div>
                                                        <Progress
                                                            max='100'
                                                            value='50'
                                                            barClassName='bg-info'
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-success' />
                                                    Approved
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
                                                <div className='d-flex align-items-center'>
                                                    <span className='mr-2'>Shipped</span>
                                                    <div>
                                                        <Progress
                                                            max='100'
                                                            value='50'
                                                            barClassName='bg-info'
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                    </tbody>
                                </Table>
                                <CardFooter className='py-4'>
                                    <nav aria-label='...'>
                                        <Pagination
                                    className='pagination justify-content-end mb-0'
                                    listClassName='justify-content-end mb-0'
                                >
                                    <PaginationItem className='disabled'>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                    tabIndex='-1'
                                                >
                                                    <i className='fas fa-angle-left' />
                                                    <span className='sr-only'>Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem className='active'>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    2
                                                    {' '}
                                                    <span className='sr-only'>(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className='fas fa-angle-right' />
                                                    <span className='sr-only'>Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                    <Row className={viewType === 3 ? '' : 'hide'}>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='border-0'>
                                    <h3 className='mb-0'>Complete Orders</h3>
                                </CardHeader>
                                <Table className='align-items-center table-flush' responsive>
                                    <thead className='thead-light'>
                                        <tr>
                                    <th scope='col'>Reference No</th>
                                    <th scope='col'>Budget</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'># of Items</th>
                                    <th scope='col'>Shipping Status</th>
                                    <th scope='col' />
                                </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-info' />
                                                    Complete
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
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
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-info' />
                                                    Complete
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
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
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-info' />
                                                    Complete
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
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
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-info' />
                                                    Complete
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
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
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                        <tr>
                                    <th scope='row'>
                                                <Media className='align-items-center'>
                                                    <Media>
                                                        <span className='mb-0 text-sm'>
                                                            {Date.now()}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                    <td>$4,400 USD</td>
                                    <td>
                                                <Badge color='' className='badge-dot'>
                                                    <i className='bg-info' />
                                                    Complete
                                                </Badge>
                                            </td>
                                    <td>
                                                <Media>
                                                    <span className='mb-0 text-sm'>
                                                        10
                                                    </span>
                                                </Media>
                                            </td>
                                    <td>
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
                                            </td>
                                    <td className='text-right'>
                                                <ButtonToolbar>
                                                    <Button appearance='ghost'>View</Button>
                                                </ButtonToolbar>
                                            </td>
                                </tr>
                                    </tbody>
                                </Table>
                                <CardFooter className='py-4'>
                                    <nav aria-label='...'>
                                        <Pagination
                                    className='pagination justify-content-end mb-0'
                                    listClassName='justify-content-end mb-0'
                                >
                                    <PaginationItem className='disabled'>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                    tabIndex='-1'
                                                >
                                                    <i className='fas fa-angle-left' />
                                                    <span className='sr-only'>Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem className='active'>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    2
                                                    {' '}
                                                    <span className='sr-only'>(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                    <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className='fas fa-angle-right' />
                                                    <span className='sr-only'>Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                </Pagination>
                                    </nav>
                                </CardFooter>
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

export default connect(mapStateToProps, null)(Orders);
