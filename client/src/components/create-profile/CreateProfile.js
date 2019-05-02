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
      // placeholder: "",
      info: "",
      location: "",
      name: "",
      alc: "",
      origin: "",
      price: "",
      description: "",
      favorites: [],
      errors: {},
      bio: "",
      border: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      bio: this.state.bio,
      name: this.state.name
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // Select options for status
    //  const options = [
    //    { label: "* Select Favorite Beer", value: 0 },
    //    { label: "Becks", value: "Favorite" },
    //    { label: "Warsteiner", value: "Favorite" },
    //    { label: "Lagerbier", value: "Favorite" },
    //    { label: "Hefeweißbier", value: "Favorite" },
    //    { label: "andere", value: "andere" }
    //  ];
    const { errors, displayFavBrands } = this.state;

    let beerInputs;

    if (displayFavBrands) {
      beerInputs = (
        <div>
          <TextFieldGroup
            handle={this.state.name}
            title="ADD HERE:"
            type="text"
            name="name"
            defaultValue={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            line="line"
            info="Please seperate with a comma"
          />
        </div>
      );
    }

    return (
      <div>
        {/* <div className="container">
          <div className="row"> */}
        {/* <div className="col-md-8 m-auto"> */}
        <h1 className="text-center">Create Your Profile</h1>
        <p className="lead text-center">
          Put some informations about yourself here
        </p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            handle={this.state.handle}
            title="ENTER A HANDLE"
            type="text"
            name="handle"
            defaultValue={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            line="line"
            info="Add a profile handle"
          />
          <TextFieldGroup
            handle="location"
            title="ADD FAVORITE BEERS"
            type="text"
            name="location"
            defaultValue={this.state.location}
            onChange={this.onChange}
            error={errors.location}
            line="line"
            info="Please separate with a comma"
          />
          <TextAreaFieldGroup
            title="ABOUT YOU"
            type="text"
            name="bio"
            border="border"
            // placeholder="Text here"
            defaultValue={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
            line="line"
            info="Tell us something about you"
          />
          {/* <SelectListGroup
                  name="status"
                  options={options}
                  defaultValue={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give us some favorites you have!"
                /> */}
          <div className="mb-3">
            <button
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
          </div>
          {beerInputs}
          <input
            type="submit"
            value="Submit"
            className="btn btn-danger btn-block"
          />
        </form>
      </div>
      // </div>
      //   </div>
      // </div>
    );
  }
}

CreateProfile.propTypes = {
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
