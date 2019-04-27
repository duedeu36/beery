import React, { Component } from "react";
import beer from "../../img/beer1.jpeg";

class Beer extends Component {
  render() {
    return (
      <div className="card">
        <img src={beer} alt="Beer" style={{ width: "30%", margin: "0 auto" }} />
        <h4>Bier Deutschland</h4>
        <p className="origin">German</p>
        <p className="price">0,89€</p>
        <p className="vol">3,9%</p>
        <p>Just a beer object</p>
        <p>
          <button>Show more</button>
        </p>
      </div>
    );
  }
}

export default Beer;
