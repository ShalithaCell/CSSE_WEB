/* eslint-disable react/jsx-handler-names,react/destructuring-assignment */
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import Dialog from "@material-ui/core/Dialog";
import githubImg from '../../assets/img/icons/common/github.svg';
import googleImg from '../../assets/img/icons/common/google.svg';
import { createUser } from "../../redux/action/UserAction";
import IsValidEmail from "../../services/CommonServices";

/**
 * user registration component of the application
 */
class Register extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            email     : '',
            password  : '',
            password2 : '',
        };
    }

    handleOnTextChange = (e) =>
    {
        this.setState({
            [e.target.id] : e.target.value,
        });
    };

    render()
    {
        const { history } = this.props;

        const handleSubmit = async () =>
        {
            if (
                this.state.email.length === 0
                || this.state.password.length === 0
                || this.state.password2.length === 0)
            {
                toast.error('all fields are required', {
                    position        : "top-right",
                    autoClose       : 5000,
                    hideProgressBar : false,
                    closeOnClick    : true,
                    pauseOnHover    : true,
                    draggable       : true,
                    progress        : true,
                });

                return;
            }

            if (this.state.password !== this.state.password2)
            {
                toast.error('Password is not matched', {
                    position        : "top-right",
                    autoClose       : 5000,
                    hideProgressBar : false,
                    closeOnClick    : true,
                    pauseOnHover    : true,
                    draggable       : true,
                    progress        : true,
                });

                return;
            }

            if (!IsValidEmail(this.state.email))
            {
                toast.error('Email is not in valid format', {
                    position        : "top-right",
                    autoClose       : 5000,
                    hideProgressBar : false,
                    closeOnClick    : true,
                    pauseOnHover    : true,
                    draggable       : true,
                    progress        : true,
                });

                return;
            }

            const result = await createUser(this.state.email, this.state.password);

            if (result !== null)
            {
                toast.success('User created. Please login', {
                    position        : "top-right",
                    autoClose       : 5000,
                    hideProgressBar : false,
                    closeOnClick    : true,
                    pauseOnHover    : true,
                    draggable       : true,
                    progress        : true,
                });

                history.push('/auth/login');
            }
        };

        return (
            <>
                <Col lg='6' md='8'>
                    <Card className='bg-secondary shadow border-0'>
                        <CardHeader className='bg-transparent pb-5'>
                            <div className='text-muted text-center mt-2 mb-4'>
                                <small>Sign up with</small>
                            </div>
                            <div className='text-center'>
                                <Button
                                    className='btn-neutral btn-icon mr-4'
                                    color='default'
                                    href='#pablo'
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <span className='btn-inner--icon'>
                                        <img
                                            alt='...'
                                            src={githubImg}
                                        />
                                    </span>
                                    <span className='btn-inner--text'>Github</span>
                                </Button>
                                <Button
                                    className='btn-neutral btn-icon'
                                    color='default'
                                    href='#pablo'
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <span className='btn-inner--icon'>
                                        <img
                                            alt='...'
                                            src={googleImg}
                                        />
                                    </span>
                                    <span className='btn-inner--text'>Google</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className='px-lg-5 py-lg-5'>
                            <div className='text-center text-muted mb-4'>
                                <small>Or sign up with credentials</small>
                            </div>
                            <Form role='form'>
                                <FormGroup>
                                    <InputGroup className='input-group-alternative mb-3'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-email-83' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='email'
                                            placeholder='Email'
                                            type='email'
                                            className='email-c'
                                            autoComplete='new-email'
                                            value={this.state.email}
                                            onChange={(e) => this.handleOnTextChange(e)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-lock-circle-open' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='password'
                                            placeholder='Password'
                                            type='password'
                                            autoComplete='new-password'
                                            value={this.state.password}
                                            onChange={(e) => this.handleOnTextChange(e)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-lock-circle-open' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id='password2'
                                            placeholder='Re-enter password'
                                            type='password'
                                            autoComplete='new-password'
                                            value={this.state.password2}
                                            onChange={(e) => this.handleOnTextChange(e)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className='text-muted font-italic'>
                                    <small>
                                        password strength:
                                        {" "}
                                        <span className='text-success font-weight-700'>strong</span>
                                    </small>
                                </div>
                                <Row className='my-4'>
                                    <Col xs='12'>
                                        <div className='custom-control custom-control-alternative custom-checkbox'>
                                            <input
                                                className='custom-control-input'
                                                id='customCheckRegister'
                                                type='checkbox'
                                            />
                                            <label
                                                className='custom-control-label'
                                                htmlFor='customCheckRegister'
                                            >
                                                <span className='text-muted'>
                                                    I agree with the
                                                    {" "}
                                                    <a href='#pablo' onClick={(e) => e.preventDefault()}>
                                                        Privacy Policy
                                                    </a>
                                                </span>
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                                <div className='text-center'>
                                    <Button
                                        className='mt-4'
                                        color='primary'
                                        type='button'
                                        onClick={handleSubmit}
                                    >
                                        Create account
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <ToastContainer />
            </>
        );
    }
}

export default Register;
