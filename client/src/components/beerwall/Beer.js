import React, { Component } from "react";
import beerImg from "../../img/beer1.jpeg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { getBeers } from "../../actions/beerActions";

class Beer extends Component {
  render() {
    const { beer } = this.props.beer;

    return (
      <div class="col-sm">
        <div className="card">
          <img
            src={beerImg}
            alt="Beer"
            style={{ width: "30%", margin: "0 auto" }}
          />
          <h4>{beer.name}</h4>
          <p className="origin">{beer.origin}</p>
          <p className="price">0,89€</p>
          <p className="vol">3,9%</p>
          <p>Just a beer object</p>
          <p>
            <button>Show more</button>
          </p>
        </div>
      </div>
    );
  }
}

Beer.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  beer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  beer: state.beer,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getBeers }
)(Beer);
