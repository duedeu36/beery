import React, { Component } from "react";

export default class Notes extends Component {
  render() {
    return (
      <div>
        <title>Personal notes for development</title>
        <table style={{ width: "50%", margin: "20px  auto" }}>
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
            <td>open</td>
          </tr>
        </table>
      </div>
    );
  }
}
