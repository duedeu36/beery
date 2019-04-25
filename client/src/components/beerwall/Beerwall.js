import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";

class Beerwall extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>
        <h1>Beerwall</h1>
      </div>
    );
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(Beerwall);
