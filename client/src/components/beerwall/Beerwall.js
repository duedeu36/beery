import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getBeers } from "../../actions/beerActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Beer from "./Beer";

class Beerwall extends Component {
  componentDidMount() {
    this.props.getBeers();
  }

  render() {
    const { user } = this.props.auth;
    const { beer, loading } = this.props.beer;

    let beerwallContent;

    if (beer === null || loading) {
      beerwallContent = <Spinner />;
    } else {
      //  Check if logged in user has beer data
      if (Object.keys(beer).length > 0) {
        beerwallContent = <Beer />;
      } else {
        // No beers posted yet
        beerwallContent = (
          <div>
            Seems like no beers are posted yet.
            <Link to="/add-beer">
              <button className="btn btn-danger">add a beer</button>
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
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
  getBeers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  beer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  beer: state.beer,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getBeers }
)(Beerwall);
