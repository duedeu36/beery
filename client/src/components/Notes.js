import React, { Component } from "react";

export default class Notes extends Component {
  render() {
    return (
      <div>
        <table style={{ width: "50%", margin: "20px  auto" }}>
          <header>Personal notes for development:</header>
          <br />
          <tr>
            <th>ToDo</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>after login show beerwall with real beers</td>
            <td>began</td>
          </tr>
          <tr>
            <td>Create profile button after logged in user</td>
            <td>done</td>
          </tr>
          <tr>
            <td>Set profileActions and profileReducer same as brad has</td>
            <td>open</td>
          </tr>
          <tr>
            <td>
              Create his Dashboard code into mine "Profilepage" or "Dashboard"
              as well, to make the "current user" working and to show user
              profiles properly
            </td>
            <td>open</td>
          </tr>
        </table>
      </div>
    );
  }
}
