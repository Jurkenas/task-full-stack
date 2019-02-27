import React, { Component } from "react";
import "../scss/footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-content">
          <ul className="list">
            <h2>CONTACTS</h2>
            <li>MARIUS JURKĖNAS</li>
            <li>+37060413922</li>
            <li>MJURKENAS@GMAIL.COM</li>
          </ul>
          <ul className="logos">
            <li>
              <a href="https://www.linkedin.com/in/marius-jurk%C4%97nas-551737150/">
                <img
                  className="linkedIn"
                  src={require("../scss/images/linkedIn.png")}
                  alt=""
                />
              </a>
              <a href="https://www.dropbox.com/s/7f927xije9dnnel/CV_Marius_Jurkenas.pdf?dl=0">
                <img
                  className="cvLogo"
                  src={require("../scss/images/cv.JPG")}
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
