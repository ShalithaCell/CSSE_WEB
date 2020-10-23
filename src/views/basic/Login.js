/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form as FormR,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { doLogin } from "../../redux/action/UserAction";

import githubImg from '../../assets/img/icons/common/github.svg';
import googleImg from '../../assets/img/icons/common/google.svg';
import { SetSession } from "../../services/SessionManagement";

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component
{
    render()
    {
        const { history } = this.props;

        return (
            <>
                <Col lg='5' md='7'>
                    <Card className='bg-secondary shadow border-0'>
                        <CardHeader className='bg-transparent pb-5'>
                            <div className='text-muted text-center mt-2 mb-3'>
                                <small>Sign in with</small>
                            </div>
                            <div className='btn-wrapper text-center'>
                                <Button
                                    className='btn-neutral btn-icon'
                                    color='default'
                                    href='#pablo'
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
                                <small>Or sign in with credentials</small>
                            </div>
                            <Formik
                                initialValues={{
                                    username : '',
                                    password : '',
                                }}
                                validationSchema={Yup.object().shape({
                                    username : Yup.string().required('Username is required'),
                                    password : Yup.string().required('Password is required'),
                                })}
                                onSubmit={async ({ username, password },
                                    {
                                        setStatus,
                                        setSubmitting,
                                    }) =>
                                {
                                    setStatus();

                                    // eslint-disable-next-line react/destructuring-assignment
                                    const result = await this.props.doLogin(
                                        username,
                                        password,
                                    );

                                    if (result.success && !result.error)
                                    { // success login
                                        // set session
                                        const sessionObj = {
                                            sessionData : {
                                                authenticated : true,
                                                userID        : result.data.userID,
                                                userName      : result.data.userName,
                                                roleID        : result.data.roleID,
                                                role          : result.data.userID,
                                                email         : result.data.role,
                                                orgID         : result.data.orgID,
                                                phone         : result.data.phone,
                                                token         : result.data.token,
                                                users         : [],
                                            },
                                        };

                                        SetSession(sessionObj);
                                        history.push('/');
                                    }
                                    else if (!result.success && !result.error)
                                    {
                                        setSubmitting(false);
                                        setStatus(result.data.errorMessages);
                                    }
                                    else
                                    {
                                        setSubmitting(false);
                                        setStatus('Something went wrong please contact with our support hub.- shalithax@gmail.com');
                                    }
                                }}
                                render={({ errors, status, touched, isSubmitting }) => (
                                    <Form role='form'>
                                        <FormGroup className='mb-3'>
                                            <InputGroup className='input-group-alternative'>
                                                <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText>
                                                        <i className='ni ni-email-83' />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Field name='username' type='email' autoComplete='new-email' className='custom-login' />
                                                <ErrorMessage name='username' component='div' className='invalid-feedback left-c' />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className='input-group-alternative'>
                                                <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText>
                                                        <i className='ni ni-lock-circle-open' />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Field name='password' type='Password' autoComplete='new-password' className='custom-login' />
                                                <ErrorMessage name='password' component='div' className='invalid-feedback left-c' />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className='custom-control custom-control-alternative custom-checkbox'>
                                            <input
                                                className='custom-control-input'
                                                id=' customCheckLogin'
                                                type='checkbox'
                                            />
                                            {/* eslint-disable-next-line max-len */}
                                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                            <label
                                                className='custom-control-label'
                                                htmlFor=' customCheckLogin'
                                            >
                                                <span className='text-muted'>Remember me</span>
                                            </label>
                                        </div>
                                        <div className='text-center'>
                                            <Button className='my-4 login-btn' color='primary' type='submit'>
                                                Sign in
                                            </Button>
                                            {isSubmitting
                                            && <img
                                                alt='loader'
                                                src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                                            />}
                                        </div>
                                        {status
                                        && <div className='alert alert-danger'>{status}</div>}
                                    </Form>
                                )}
                            />
                        </CardBody>
                    </Card>
                    <Row className='mt-3'>
                        <Col xs='6'>
                            <a
                                className='text-light'
                                href='#pablo'
                            >
                                <small>Forgot password?</small>
                            </a>
                        </Col>
                        <Col className='text-right' xs='6'>
                            <a
                                className='text-light'
                                href='#pablo'
                            >
                                <small>Create new account</small>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    forgotPwPop : state.system.popupForgotpwDialog,
});

export default connect(mapStateToProps, { doLogin })(Login);
