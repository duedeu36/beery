import React, { Component } from "react";

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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);
  }
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
              defaultValue={this.state.email}
              onChange={this.onChange}
              name="email"
            />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label>
            <p ref="animation" className="label-txt">
              ENTER YOUR NAME
            </p>
            <input
              type="text"
              className="input"
              defaultValue={this.state.name}
              onChange={this.onChange}
              name="name"
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
              defaultValue={this.state.password}
              onChange={this.onChange}
              name="password"
            />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label>
            <p ref="animation" className="label-txt">
              CONFIRM YOUR PASSWORD
            </p>
            <input
              type="password"
              className="input"
              defaultValue={this.state.password2}
              onChange={this.onChange}
              name="password2"
            />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <button type="submit">register</button>
        </form>
      </div>
    );
  }
}

export default Register;
