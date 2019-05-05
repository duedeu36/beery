import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { deleteUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
import Profile from "./Profile";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    //  in profileReducer 'profile' and 'loading' are called within this function...
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };
  onDeleteUserClick = e => {
    this.props.deleteUser();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    // ...and when the function is called we can make this if else statement
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //  Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <Profile />
            <button onClick={this.onDeleteClick} className="btn btn-warning">
              delete my profile
            </button>
            <button onClick={this.onDeleteUserClick} className="btn btn-danger">
              kill this user
            </button>
          </div>
        );
      } else {
        // No beers posted yet
        dashboardContent = (
          <div>
            Hallo {user.name}, nice to see you. You don't have a profile yet.
            Click the button to create one.
            <Link to="/create-profile">
              <button className="btn btn-danger">create a profile</button>
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <h1>Dashboard</h1>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, deleteUser }
)(Dashboard);
