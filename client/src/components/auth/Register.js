import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import classnames from "classnames";
import authReducer from "../../reducers/authReducer";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

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

    this.props.registerUser(newUser);

    //  axios
    //    .post("/api/users/register", newUser)
    //    .then(res => console.log(res.data))
    //    .catch(err => this.setState({ errors: err.response.data }));
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

    //  const { user } = this.props.auth;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            {this.props.auth.user ? this.props.auth.user.name : null}
            <p ref="animation" className="label-txt">
              ENTER YOUR EMAIL
            </p>
            <input
              type="text"
              className={classnames("input", {
                "form-control is-invalid": errors.email
              })}
              defaultValue={this.state.email}
              onChange={this.onChange}
              name="email"
            />
            <div className="line-box">
              <div className="line" />
            </div>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </label>
          <label>
            <p ref="animation" className="label-txt">
              ENTER YOUR NAME
            </p>
            <input
              type="text"
              className={classnames("input", {
                "form-control is-invalid": errors.name
              })}
              defaultValue={this.state.name}
              onChange={this.onChange}
              name="name"
            />
            <div className="line-box">
              <div className="line" />
            </div>
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </label>
          <label>
            <p ref="animation" className="label-txt">
              ENTER YOUR PASSWORD
            </p>
            <input
              type="password"
              className={classnames("input", {
                "form-control is-invalid": errors.password
              })}
              defaultValue={this.state.password}
              onChange={this.onChange}
              name="password"
            />
            <div className="line-box">
              <div className="line" />
            </div>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </label>
          <label>
            <p ref="animation" className="label-txt">
              CONFIRM YOUR PASSWORD
            </p>
            <input
              type="password"
              className={classnames("input", {
                "form-control is-invalid": errors.password2
              })}
              defaultValue={this.state.password2}
              onChange={this.onChange}
              name="password2"
            />
            <div className="line-box">
              <div className="line" />
            </div>
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
          </label>
          <button type="submit">register</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
