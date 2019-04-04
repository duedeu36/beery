import React, { Component } from "react";
import "./App.css";
import Landing from "./components/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Beery </h1>{" "}
        <Landing />
      </div>
    );
  }
}

export default App;
