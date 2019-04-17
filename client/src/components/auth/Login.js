import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    alert("User with email " + this.state.email + " is successfully logged in");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            <p ref="animation" className="label-txt">
              ENTER YOUR EMAIL
            </p>
            <input
              type="text"
              className="input"
              onChange={this.onChange}
              name="email"
            />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label>
            <p ref="animation" className="label-txt">
              ENTER YOUR PASSWORD
            </p>
            <input
              type="password"
              className="input"
              onChange={this.onChange}
              name="password"
            />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
}

export default Login;
