import React, { Component } from "react";
import List from "./List";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      items: []
    };
  }

  onChange = event => {
    this.setState({ word: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      word: "",
      items: [...this.state.items, this.state.word]
    });
  };

  render() {
    return (
      <div>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.word} onChange={this.onChange} />
          <button>Submit</button>
        </form>
        <List items={this.state.items} />
      </div>
    );
  }
}

// after login show beerwall with real beers	began	•
// Create profile button after logged in user	done	•
// Set profileActions and profileReducer same as brad has	open	•
// Create his Dashboard code into mine "Profilepage" or "Dashboard" as well, to make the "current user" working and to show user profiles properly
