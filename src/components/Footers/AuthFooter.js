/* eslint-disable react/jsx-one-expression-per-line,jsx-a11y/anchor-is-valid */
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

/**
 * login page footer
 */
class Login extends React.Component
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
                <footer className='py-5'>
                    <Container>
                        <Row className='align-items-center justify-content-xl-between'>
                            <Col xl='6'>
                                <div className='copyright text-center text-xl-left text-muted'>
                                    © { new Date().getFullYear() }
                                    {" "}
                                    <a
                                        className='font-weight-bold ml-1'
                                        href='#'
                                    >
                                        2020-JUN-WE-03
                                    </a>
                                </div>
                            </Col>
                            <Col xl='6'>
                                <Nav className='nav-footer justify-content-center justify-content-xl-end'>
                                    <NavItem>
                                        <NavLink
                                            href='#'
                                            target='_blank'
                                        >
                                            2020-JUN-WE-03
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href='#'
                                            target='_blank'
                                        >
                                            About Us
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </>
        );
    }
}

export default Login;
