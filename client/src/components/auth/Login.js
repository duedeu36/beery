import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            <p ref="animation" className="label-txt">
              ENTER YOUR EMAIL
            </p>
            <input type="text" className="input" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label>
            <p ref="animation" className="label-txt">
              ENTER YOUR PASSWORD
            </p>
            <input type="text" className="input" />
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
