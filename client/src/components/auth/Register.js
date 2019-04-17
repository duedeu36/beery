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
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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
        <form>
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
              type="text"
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
              type="text"
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
