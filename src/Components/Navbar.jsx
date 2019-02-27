import React, { Component } from "react";
import "../scss/navbar.scss";
import { Link } from "react-router-dom";
import Login from "./Login";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <Link to="/">HOME</Link>
          <Link to="/users">USERS</Link>
          <nav className="navbar-right">
            <Login />
          </nav>
        </nav>
      </div>
    );
  }
}

export default Navbar;
