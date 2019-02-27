import React, { Component } from "react";
import "../scss/newuser.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: ""
        }
      },
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleGeoChange = this.handleGeoChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(e) {
    this.state[e.target.id] = e.target.value;
  }

  handleAddressChange(e) {
    this.state.address[e.target.id] = e.target.value;
  }

  handleCompanyChange(e) {
    this.state.company[e.target.id] = e.target.value;
  }

  handleGeoChange(e) {
    this.state.address.geo[e.target.id] = e.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    const res = this.state;
    fetch("http://localhost:8000/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ res })
    });
  }

  render() {
    return (
      <div className="bg-image">
        <div>
          <Navbar />
        </div>
        <div>
          <form className="registration" onSubmit={this.handleSubmit}>
            <h1>Create new user</h1>
            <ul>
              <li>
                <input
                  type="text"
                  id="name"
                  onChange={this.handleUserChange}
                  placeholder="Name"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="username"
                  onChange={this.handleUserChange}
                  placeholder="Username"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="email"
                  onChange={this.handleUserChange}
                  placeholder="Email"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="phone"
                  onChange={this.handleUserChange}
                  placeholder="Phone"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="website"
                  onChange={this.handleUserChange}
                  placeholder="Website"
                />
              </li>
              <li>Address</li>
              <li>
                <input
                  type="text"
                  id="street"
                  onChange={this.handleAddressChange}
                  placeholder="Street"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="suite"
                  onChange={this.handleAddressChange}
                  placeholder="Suite"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="city"
                  onChange={this.handleAddressChange}
                  placeholder="City"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="zipcode"
                  onChange={this.handleAddressChange}
                  placeholder="Zipcode"
                />
              </li>
              <li>Geo location</li>
              <li>
                <input
                  type="text"
                  id="lat"
                  onChange={this.handleGeoChange}
                  placeholder="Latitude"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="lng"
                  onChange={this.handleGeoChange}
                  placeholder="Longitude"
                />
              </li>
              <li>Company</li>
              <li>
                <input
                  type="text"
                  id="name"
                  onChange={this.handleCompanyChange}
                  placeholder="Name"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="catchPhrase"
                  onChange={this.handleCompanyChange}
                  placeholder="Catch Phrase"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="bs"
                  onChange={this.handleCompanyChange}
                  placeholder="bs"
                />
              </li>
              <li>
                <input
                  type="submit"
                  id="submit"
                  className="button"
                  value="Create"
                />
              </li>
            </ul>
          </form>
        </div>
        <ScrollUpButton />
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default NewUser;
