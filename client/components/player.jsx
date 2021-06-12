import React, { Component } from "react";
import * as _ from "lodash";
import socket from "../io";
import AuthService from "../services/auth.service";
import axios from "axios";
const API_URL = window.location.origin + "/api/";

export default class Computer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.checkWinner = this.checkWinner.bind(this);

    this.state = {
      moves: Array(9).fill(null),
      status: "",
      opponent: "",
      gameKey: "",
      currGame: null,
      mark: "",
      user: "",
      opponent: ""
    };
  }

  async componentDidMount() {
    const user = await AuthService.getCurrentUser();
    if (user) {
      socket.emit("joinGame", { username: user.username });
      this.setState({ user: user.username });
    } else {
      window.location.replace("/login");
    }
    socket.on("status", data => {
      if (data.status === "wait") {
        this.setState({ status: "" });
      } else if (data.status === "connected") {
        this.setState({
          status: "connected",
          opponent: data.opponent,
          gameKey: data.gameKey,
          game: data.game,
          mark: data.mark,
          moves: data.game.moves
        });
      }
    });
    socket.on("receiveMove", data => {
      this.setState({
        game: data.game,
        moves: data.game.moves
      });
    });
  }

  componentWillUnmount() {
    socket.off("status");
    socket.off("receiveMove");
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
    const { moves, mark, game, gameKey, user, opponent } = this.state;
    if (moves[i]) return;
    if (game.winningMark) return;
    if (game.currTurn !== mark) return;
    moves[i] = mark;
    if (this.checkWinner(moves, mark)) {
      axios.put(API_URL + "leaderboard/record", { username: user });
      axios.post(API_URL + "game/record", {
        player1: user,
        player2: opponent,
        winner: user
      });
      game.winningMark = mark;
    }
    if (moves.filter(move => !!move).length === 9) {
      axios.post(API_URL + "game/record", {
        player1: user,
        player2: opponent,
        winner: "draw"
      });
      game.winningMark = "draw";
    }
    game.moves = moves;
    game.currTurn = game.currTurn === "X" ? "O" : "X";
    socket.emit("makeMove", { gameKey, game });
    this.setState({ moves, game });
  }

  render() {
    const { moves, game, mark, user } = this.state;
    if (!user) return <div></div>;

    const square = i => (
      <button className="square" onClick={() => this.handleClick(i)}>
        {moves[i]}
      </button>
    );

    const statusWidget = () => {
      const { status, opponent } = this.state;
      if (!status) {
        return <div>Waiting for player...</div>;
      } else {
        return <div>Opponent: {opponent}</div>;
      }
    };

    const boardWidget = () => {
      if (!this.state.status) return;
      return (
        <div>
          <div className="row">
            {square(0)}
            {square(1)}
            {square(2)}
          </div>
          <div className="row">
            {square(3)}
            {square(4)}
            {square(5)}
          </div>
          <div className="row">
            {square(6)}
            {square(7)}
            {square(8)}
          </div>
        </div>
      );
    };

    const resultWidget = () => {
      if (!game || !game.winningMark) return;
      let result;
      if (game.winningMark === mark) {
        result = "You win!";
      } else if (game.winningMark === "draw") {
        result = "Draw.";
      } else {
        result = "You lose.";
      }
      return (
        <div className="alert alert-primary" role="alert">
          {result}
        </div>
      );
    };

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Tic Tac Toe</h3>
          <h4>Vs. Player</h4>
        </header>
        {statusWidget()}
        {resultWidget()}
        {boardWidget()}
      </div>
    );
  }
}
