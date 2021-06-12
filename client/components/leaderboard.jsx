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
          <h4>Leaderboard</h4>
        </header>
        <table className="table table-striped">
          <tbody>
            {topWinners
              .sort((user1, user2) => user2.wins - user1.wins)
              .map((winner, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{winner.username}</td>
                  <td>{winner.wins} wins</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
