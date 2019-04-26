import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

class Beerwall extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let beerwallContent;

    if (profile === null || loading) {
      beerwallContent = <Spinner />;
    } else {
      //  Check if logged in user has profile data
      beerwallContent = "Hello";
    }

    return (
      <div className="beerwall">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Beerwall</h1>
              {beerwallContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Beerwall.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
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
)(Beerwall);
