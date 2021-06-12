import React, { Component } from "react";
import axios from "axios";
const API_URL = window.location.origin + "/api/leaderboard/";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topWinners: []
    };
  }

  componentDidMount() {
    axios.get(API_URL + "retrieve").then(response => {
      this.setState({ topWinners: response.data.data });
    });
  }

  render() {
    const { topWinners } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Tic Tac Toe</h3>
          <h4>Leaderboard</h4>
        </header>
        <ol>
          {topWinners
            .sort((user1, user2) => user2.wins - user1.wins)
            .map((winner, i) => (
              <li key={i}>{`${winner.username} || ${winner.wins} wins`}</li>
            ))}
        </ol>
      </div>
    );
  }
}
