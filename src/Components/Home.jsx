import React, { Component } from "react";
import "../scss/home.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

class Home extends Component {
  render() {
    return (
      <div className="bg-image">
        <div>
          <Navbar />
        </div>
        <div className="home-page">
          <ul>
            <li>USER MANAGEMENT</li>
            <li>APPLICATION</li>
          </ul>
        </div>
        <ScrollUpButton />
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default Home;
