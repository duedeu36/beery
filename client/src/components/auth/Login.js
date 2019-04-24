import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

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

  //   Push to /beerwall when reach (manually) the /login route
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/beerwall");
    }
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
          <TextFieldGroup
            title="EMAIL"
            type="email"
            name="email"
            defaultValue={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            line="line"
          />
          <TextFieldGroup
            title="PASSWORD"
            type="password"
            name="password"
            defaultValue={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            line="line"
          />
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
