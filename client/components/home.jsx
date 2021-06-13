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
        <div className="alert alert-primary" role="alert">
          Please login to play Tic Tac Toe
        </div>
      );
    }

    return (
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <Link to="/computer">
              <button className="btn btn-primary btn-lg">
                Play vs. Computer
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to="/player">
              <button className="btn btn-primary btn-lg">Play vs. Human</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
