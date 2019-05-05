import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>this is the Profile page</h1>
        <Link to="/edit-profile">
          <button className="btn btn-primary">Edit Profile</button>
        </Link>
      </div>
    );
  }
}

export default Profile;
