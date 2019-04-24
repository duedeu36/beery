import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    //  not needed because of ES6 arrow function:
    //  this.onChange = this.onChange.bind(this);
    //  this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/beerwall");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };
  //   state = {
  //     addAnimation: false,
  //     removeAnimation: false
  //   };

  //   showAnim = () => {
  //     this.setState({
  //       addAnimation: !this.state.addAnimation
  //     });
  //   };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            <TextFieldGroup
              title="EMAIL"
              type="email"
              name="email"
              defaultValue={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              line="line"
              info="This site uses Gravatar, so if you want a profile image, use a Gravatar email"
            />
          </label>
          <label>
            <TextFieldGroup
              title="NAME"
              type="name"
              name="name"
              defaultValue={this.state.name}
              onChange={this.onChange}
              error={errors.name}
              line="line"
            />
          </label>
          <label>
            <TextFieldGroup
              title="PASSWORD"
              type="password"
              name="password"
              defaultValue={this.state.password}
              onChange={this.onChange}
              error={errors.password}
              line="line"
            />
          </label>
          <label>
            <TextFieldGroup
              title2="PASSWORD"
              type="password"
              name="password2"
              defaultValue={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
              line="line"
            />
          </label>
          <button type="submit">register</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
