import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>name</h1>
            <p>about user</p>
          </div>
        </div>

        <div className="container-fluid bg-3 text-center">
          <h3>beers here</h3>
          <div className="row">
            <div className="col-sm-3">
              <p>beer</p>
              <img
                src="../../img/b.png"
                alt=""
                className="rounded-circle"
                width="50px"
                height="50px"
              />
            </div>
            <div className="col-sm-3">
              <p>beer</p>
            </div>
            <div className="col-sm-3">
              <p>beer</p>
            </div>
            <div className="col-sm-3">
              <p>beer</p>
            </div>
          </div>
        </div>
        <br />

        <Link to="/edit-profile">
          <button className="btn btn-primary btn-sm">Edit Profile</button>
        </Link>
      </div>
    );
  }
}

export default Profile;
