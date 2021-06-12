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
          <h4>History</h4>
        </header>
        <table className="table table-striped">
          <tbody>
            {pastGames.map((game, i) => (
              <tr key={i}>
                <td>
                  {game.player1} vs. {game.player2}
                </td>
                <td>
                  {game.winner === "draw" ? "Draw" : `${game.winner} Won`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
