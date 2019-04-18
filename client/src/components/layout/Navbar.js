import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="bg-dark text-white p-2">
        <div className="row">
          <div className="col-8">
            <Link
              to="/home"
              className="btn btn-outline-light"
              style={{ width: "60px", height: "60px" }}
            >
              <h1>B</h1>
            </Link>
          </div>
          <div className="col-4 align-self-center">
            <Link to="/register">
              <button type="button" className="btn btn-primary">
                Register
              </button>
            </Link>{" "}
            <Link to="/login">
              <button type="button" className="btn btn-success">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
