import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import AuthService from "./services/auth.service";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Computer from "./components/computer";
import Player from "./components/player";
import Leaderboard from "./components/leaderboard";
import History from "./components/history";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/leaderboard" className="nav-link">
                Leaderboard
              </a>
            </li>
          </div>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/history" className="nav-link">
                History
              </a>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]}>
              <Home currentUser={currentUser} />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/computer" component={Computer} />
            <Route exact path="/player" component={Player} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/history" component={History} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
