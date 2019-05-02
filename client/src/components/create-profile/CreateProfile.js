import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  onSubmit(e) {
    e.preventDefault();

    console.log("submit");
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // Select options for status
    const options = [
      { label: "* Select Favorite Beer", value: 0 },
      { label: "Becks", value: "Favorite" },
      { label: "Warsteiner", value: "Favorite" },
      { label: "Lagerbier", value: "Favorite" },
      { label: "Hefeweißbier", value: "Favorite" },
      { label: "andere", value: "andere" }
    ];
    const { errors } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Put some informations about yourself here
              </p>
              <label onSubmit={this.onSubmit}>
                <TextFieldGroup
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
                  title="ADD FAVORITE BEERS"
                  type="text"
                  name="favorites"
                  defaultValue={this.state.favorites}
                  onChange={this.onChange}
                  error={errors.favorites}
                  line="line"
                  info="Please separate with comma"
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
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  prfile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
