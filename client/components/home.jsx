import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return (
        <div className="container">
          <header className="jumbotron">
            <h3>Tic Tac Toe</h3>
          </header>
          <div>Please login to play Tic Tac Toe</div>
        </div>
      );
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Tic Tac Toe</h3>
					<div>
					<Link to="/computer"><button className="btn btn-primary" onClick>Play vs. Computer</button></Link>
					</div>
        </header>
      </div>
    );
  }
}
