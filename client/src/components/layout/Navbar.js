import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    //  in profileReducer 'profile' and 'loading' are called within this function...
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let navbarHandle;
    // ...and when the function is called we can make this if else statement
    if (profile === null || loading) {
      navbarHandle = user.name;
    } else {
      //  Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        navbarHandle = (
          <Link to={`/profile/${profile.handle}`}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ borderRadius: "50%", width: "20px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />
          </Link>
        );
      } else {
        navbarHandle = null;
      }
    }

    const authLinks = (
      <div className="col-4 align-self-center">
        <div className="row">
          {navbarHandle}
          <Link to="/dashboard">
            <button type="button" className="btn btn-info">
              dashboard
            </button>
          </Link>

          <button
            onClick={this.onLogoutClick}
            type="button"
            className="btn btn-success"
          >
            Logout
          </button>
        </div>
      </div>
    );

    const guestLinks = (
      <div className="col-4 align-self-center">
        <Link to="/register">
          <button type="button" className="btn btn-primary">
            Register
          </button>
        </Link>{" "}
        <Link to="/login">
          <button type="button" className="btn btn-success">
            Login
          </button>
        </Link>
      </div>
    );

    return (
      <nav className="bg-dark text-white p-2">
        <div className="row">
          <div className="col-8">
            <Link
              to="/home"
              className="btn btn-outline-light"
              style={{ width: "60px", height: "60px" }}
            >
              <h1>B</h1>
            </Link>
            <Link to="/beerwall">
              <button type="button" className="btn btn-warning">
                Beerwall
              </button>
            </Link>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getCurrentProfile }
)(Navbar);
