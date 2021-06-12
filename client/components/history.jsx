import React, { Component } from "react";
import axios from "axios";
const API_URL = window.location.origin + "/api/game/";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pastGames: []
    };
  }

  componentDidMount() {
    axios.get(API_URL + "history").then(response => {
      this.setState({ pastGames: response.data.data });
    });
  }

  render() {
    const { pastGames } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Tic Tac Toe</h3>
          <h4>History</h4>
        </header>
        <ol>
          {pastGames.map((game, i) => (
            <li key={i}>{`${game.player1} vs. ${game.player2} || Result: ${
              game.winner === "draw" ? "Draw" : `${game.winner} Won`
            }`}</li>
          ))}
        </ol>
      </div>
    );
  }
}
