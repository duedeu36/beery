import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    //  not needed because of ES6 arrow function:
    //  this.onChange = this.onChange.bind(this);
    //  this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/beerwall");
    }
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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            <p ref="animation" className="label-txt">
              ENTER YOUR EMAIL
            </p>
            <input
              type="type"
              onChange={this.onChange}
              name="email"
              className={classnames("input", {
                "form-control is-invalid": errors.email
              })}
              defaultValue={this.state.email}
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
              ENTER YOUR PASSWORD
            </p>
            <input
              type="password"
              className={classnames("input", {
                "form-control is-invalid": errors.email
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
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
