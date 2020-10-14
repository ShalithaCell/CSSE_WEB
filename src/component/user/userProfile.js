import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../resources/styles/profile.css';
import  userDefault from '../../resources/images/user_default.png';
import Button from '@material-ui/core/Button';

class UserProfile extends Component
{
    constructor(props)
    {
        super(props);

    }

	render()
	{
		return(<div>
    <div className="container emp-profile ">
        <form method="post">
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-img">
                        <img
									src={ userDefault }
									alt=""/>
                        <div className="file btn btn-lg btn-primary">
                            Change Photo
                            <input type="file" name="file"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="profile-head">
                        <h5>
                            { this.props.user.userName }
                        </h5>
                        <h6>
                            { this.props.user.role }
                        </h6>
                        <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
										   role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-md-4">

                </div>
                <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel"
									 aria-labelledby="home-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{ this.props.user.email }</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>User name</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{ this.props.user.userName }</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Role</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{ this.props.user.role }</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{ this.props.user.phone }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, null)(UserProfile);
