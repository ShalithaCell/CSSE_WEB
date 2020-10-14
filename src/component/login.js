import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogin, getPermissonLevels } from '../redux/userActions';
import { popupPasswordResetDialog } from '../redux/systemActions'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../resources/styles/login.css'
import PasswordResetDialog from './dialog_password_reset';
import { SetSession } from '../services/sessionManagement';

class login extends Component
{

	OnClickListner = (e) => {
		e.preventDefault();

		switch (e.target.id)
		{
			case 'forgot-password':
				this.props.popupPasswordResetDialog(true);
				break;
		}
	}

	render()
	{
		return (
    <div className="my-login-page">
        <PasswordResetDialog/>
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-md-center h-100">
                    <div className="card-wrapper">
                        <div className="brand">
                            <img src={ process.env.PUBLIC_URL + '/resources/img/logo.jpg' } alt="logo"/>
                        </div>
                        <div className="card fat">
                            <div className="card-body">
                                <h4 className="card-title">Login</h4>
                                <Formik
									initialValues={ {
									username : '',
									password : ''
								} }
									validationSchema={ Yup.object().shape({
									username : Yup.string().required('Username is required'),
									password : Yup.string().required('Password is required')
								}) }
									onSubmit={ async ({ username, password }, { setStatus, setSubmitting }) =>
									{
debugger;
										setStatus();
										const result = await this.props.doLogin(username, password);

										if(result.success && !result.error){ //success login
											
											//set session
											const sessionObj = { 
												'sessionData' : this.props.items
											};
											console.log(sessionObj);
											SetSession(sessionObj);

											//set permissons
											// this.props.getPermissonLevels(result.data.userID);

											const { from } = this.props.location.state || { from: { pathname: '/home' } };
											this.props.history.push(from);

											window.location.reload();
										}else if( !result.success && !result.error ){ //failed login
											setSubmitting(false);
											setStatus(result.data.errorMessages);
										}else{ //error
											setSubmitting(false);
											setStatus('Something went wrong please contact with our support hub.');
										}

									} }
									render={ ({ errors, status, touched, isSubmitting }) => (
    <Form className="my-login-validation">
        <div className="text-danger"></div>
        <div className="form-group">
            <label htmlFor="username" className="left-c">Email</label>
            <Field name="username" type="text" className={ 'form-control' + (errors.username && touched.username ? ' is-invalid' : '') } />
            <ErrorMessage name="username" component="div" className="invalid-feedback left-c" />
        </div>
        <div className="form-group">
            <label htmlFor="password" className="left-c">
                Password
                <a id="forgot-password" className="float-right" href="#" onClick={ this.OnClickListner }>Forgot
                    Password?</a>
            </label>
            <Field name="password" type="Password" className={ 'form-control' + (errors.password && touched.password ? ' is-invalid' : '') } />
            <ErrorMessage name="password" component="div" className="invalid-feedback left-c" />
        </div>
        <div className="form-group">
            <div className="custom-checkbox custom-control">
                <input type="checkbox" className="custom-control-input"/>
                <label htmlFor="RememberMe" className="custom-control-label left-c">
                    RememberMe
                </label>
            </div>
        </div>
        <div className="form-group  m-0">
            <button type="submit" className="btn btn-primary btn-block" disabled={ isSubmitting }>Log in</button>
            {isSubmitting &&
            	<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
			}
        </div>
        {status &&
        <div className={ 'alert alert-danger' }>{ status }</div>
		}
    </Form>
								) }
                                />
                            </div>
                        </div>
                        <div className="footer">
                            Copyright &copy; {(new Date().getFullYear())} &mdash; <a href="#" target="_blank">NVIVID
                                Technologies</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
			
		)
	};
}

const mapStateToProps = (state) => ({
	items       : state.user,
	forgotPwPop : state.system.popupForgotpwDialog
})

export default connect(mapStateToProps, { doLogin, popupPasswordResetDialog, getPermissonLevels })(login);
