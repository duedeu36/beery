import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>{this.props.auth.user.name}</h1>
            {/* <p>info here: infotext</p> */}
            <p>{this.props.profile.profile.info}</p>
          </div>
        </div>

        <div className="container-fluid bg-3 text-center">
          <h3>beers here</h3>
          <div className="row">
            <div className="col-sm-3">
              <p>beer</p>
              <img
                src="../../img/b.png"
                alt=""
                className="rounded-circle"
                width="50px"
                height="50px"
              />
            </div>
            <div className="col-sm-3">
              <p>beer</p>
            </div>
            <div className="col-sm-3">
              <p>beer</p>
            </div>
            <div className="col-sm-3">
              <p>beer</p>
            </div>
          </div>
        </div>
        <br />

        <Link to="/edit-profile">
          <button className="btn btn-primary btn-sm">Edit Profile</button>
        </Link>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  // deleteAccount: PropTypes.func.isRequired,
  // deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
