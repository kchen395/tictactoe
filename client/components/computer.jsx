import React, { Component } from "react";
import * as _ from "lodash";
import AuthService from "../services/auth.service";
import Board from "./board";

export default class Computer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.rematch = this.rematch.bind(this);

    this.state = {
      moves: Array(9).fill(null),
      winner: "",
      user: ""
    };
  }

  async componentDidMount() {
    const user = await AuthService.getCurrentUser();
    if (user) {
      this.setState({ user: user.username });
    } else {
      window.location.replace("/login");
    }
  }

  checkWinner(moves, markType) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const markedSquares = [];
    if (markType === "X") {
      moves.forEach((move, index) => {
        if (move === "X") {
          markedSquares.push(index);
        }
      });
    }
    if (markType === "O") {
      moves.forEach((move, index) => {
        if (move === "O") {
          markedSquares.push(index);
        }
      });
    }

    for (let winCondition of winConditions) {
      if (_.difference(winCondition, markedSquares).length === 0) {
        return true;
      }
    }
    return false;
  }

  handleClick(i) {
    const { moves, winner } = this.state;
    if (moves[i]) return;
    if (winner) return;
    moves[i] = "X";
    if (this.checkWinner(moves, "X")) {
      this.setState({ moves, winner: "player" });
      return;
    }
    const openSquares = [];
    moves.forEach((move, index) => {
      if (!move) {
        openSquares.push(index);
      }
    });
    const computerChoice =
      openSquares[Math.floor(Math.random() * openSquares.length)];
    moves[computerChoice] = "O";
    if (this.checkWinner(moves, "O")) {
      this.setState({ moves, winner: "computer" });
      return;
    }
    if (moves.filter(move => !!move).length === 9) {
      this.setState({ moves, winner: "draw" });
      return;
    }
    this.setState({ moves });
  }

  rematch() {
    this.setState({ moves: Array(9).fill(null), winner: "" });
  }

  render() {
    const { moves, winner, user } = this.state;
    if (!user) return <div></div>;

    let result;
    if (winner === "player") {
      result = "Player Wins!";
    } else if (winner === "computer") {
      result = "Computer Wins!";
    } else if (winner === "draw") {
      result = "Draw.";
    }

    return (
      <div className="container">
			<header className="jumbotron">
          <h4>Vs. Computer</h4>
        </header>
        {result && (
          <div className="alert alert-info text-center" role="alert">
            {result}
          </div>
        )}
        <Board handleClick={this.handleClick} moves={moves} />
        {result && (
          <div className="text-center">
            <button className="btn btn-primary mt-3" onClick={this.rematch}>
              Rematch
            </button>
          </div>
        )}
      </div>
    );
  }
}
