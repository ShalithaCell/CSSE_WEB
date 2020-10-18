import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

/**
 * Administrator mode footer
 */
class Footer extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            currentYear : new Date().getFullYear(),
        };
    }

    render()
    {
        const { currentYear } = this.state;

        return (
            <footer className='footer'>
                <Row className='align-items-center justify-content-xl-between'>
                    <Col xl='6'>
                        <div className='copyright text-center text-xl-left text-muted'>
                            ©
                            { currentYear }
                            {' '}
                            <span id='year' />
                            {" "}
                            <a
                                className='font-weight-bold ml-1'
                                href='https://github.com/ShalithaCell/CSSE_WEB'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                2020-JUN-WE-03
                            </a>
                        </div>
                    </Col>

                </Row>
            </footer>
        );
    }
}

export default Footer;
