import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFavBrands: false,
      handle: "",
      defaultValue: "",
      info: "",
      location: "",
      name: "",
      favorites: [],
      errors: {},
      // bio: "", // Spruch!
      border: ""
    };

    //  this.onChange = this.onChange.bind(this);
    //  this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      favorites: this.state.favorites,
      info: this.state.info
    };

    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors, displayFavBrands } = this.state;
    // Select options for status
    //  const options = [
    //    { label: "* Select Favorite Beer", value: 0 },
    //    { label: "Becks", value: "Favorite" },
    //    { label: "Warsteiner", value: "Favorite" },
    //    { label: "Lagerbier", value: "Favorite" },
    //    { label: "Hefeweißbier", value: "Favorite" },
    //    { label: "andere", value: "andere" }
    //  ];

    let beerInputs;

    if (displayFavBrands) {
      beerInputs = (
        <div>
          <TextFieldGroup
            handle={this.state.favorites}
            title="ADD HERE:"
            type="text"
            name="favorites"
            defaultValue={this.state.favorites}
            onChange={this.onChange}
            // error={errors.favorites}
            line="line"
            info="Please seperate with a comma"
          />
          nichts
        </div>
      );
    }

    return (
      <div>
        <h1 className="text-center">Create Your Profile</h1>
        <p className="lead text-center">
          Put some informations about yourself here
        </p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            title="ENTER HANDLE"
            name="handle"
            defaultValue={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            line="line"
            info="Enter profile handle, it cannot be changed!"
          />
          <TextAreaFieldGroup
            title="ABOUT YOU"
            type="text"
            name="info"
            border="border"
            // placeholder="Text here"
            defaultValue={this.state.info}
            onChange={this.onChange}
            line="line"
            info="Tell us something about you"
          />
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                this.setState(prevState => ({
                  displayFavBrands: !prevState.displayFavBrands
                }));
              }}
              className="btn btn-light"
            >
              Add Favorite Brands
            </button>
            <small className="text-muted">(optional)</small>
            {beerInputs}
          </div>
          {/* <input
            type="submit"
            value="Submit"
            className="btn btn-danger btn-block"
          /> */}
          <button type="submit">Create Profile</button>
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  //   createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
