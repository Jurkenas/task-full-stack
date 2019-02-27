import React, { Component } from "react";
import "../scss/newuser.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      address: {
        id: "",
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          id: "",
          lat: "",
          lng: ""
        }
      },
      company: {
        id: "",
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
    fetch("http://localhost:8000/user/edit", {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ res })
    });
    this.props.history.push("/users");
  }

  getUserData() {
    const { id } = this.props.match.params;
    fetch(`http://localhost:8000/user/get/${id}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);

        this.setState({
          id: res.users.user_id,
          name: res.users.name,
          username: res.users.username,
          email: res.users.email,
          phone: res.users.phone,
          website: res.users.website,
          address: {
            id: res.address.address_id,
            street: res.address.street,
            suite: res.address.suite,
            city: res.address.city,
            zipcode: res.address.zipcode,
            geo: {
              id: res.geo.geo_id,
              lat: res.geo.lat,
              lng: res.geo.lng
            }
          },
          company: {
            id: res.company.company_id,
            name: res.company.name,
            catchPhrase: res.company.catchPhrase,
            bs: res.company.bs
          }
        });
      });
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    return (
      <div className="bg-image">
        <div>
          <Navbar />
        </div>
        <div>
          <form className="registration" onSubmit={this.handleSubmit}>
            <h1>Update user</h1>
            <ul>
              <li>
                <input
                  type="text"
                  id="name"
                  onChange={this.handleUserChange}
                  defaultValue={this.state.name}
                  placeholder="Name"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="username"
                  onChange={this.handleUserChange}
                  defaultValue={this.state.username}
                  placeholder="Username"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="email"
                  onChange={this.handleUserChange}
                  defaultValue={this.state.email}
                  placeholder="Email"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="phone"
                  onChange={this.handleUserChange}
                  defaultValue={this.state.phone}
                  placeholder="Phone"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="website"
                  onChange={this.handleUserChange}
                  defaultValue={this.state.website}
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
                  defaultValue={this.state.address.street}
                />
              </li>
              <li>
                <input
                  type="text"
                  id="suite"
                  onChange={this.handleAddressChange}
                  defaultValue={this.state.address.suite}
                  placeholder="Suite"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="city"
                  onChange={this.handleAddressChange}
                  defaultValue={this.state.address.city}
                  placeholder="City"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="zipcode"
                  onChange={this.handleAddressChange}
                  defaultValue={this.state.address.zipcode}
                  placeholder="Zipcode"
                />
              </li>
              <li>Geo location</li>
              <li>
                <input
                  type="text"
                  id="lat"
                  onChange={this.handleGeoChange}
                  defaultValue={this.state.address.geo.lat}
                  placeholder="Latitude"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="lng"
                  onChange={this.handleGeoChange}
                  defaultValue={this.state.address.geo.lng}
                  placeholder="Longitude"
                />
              </li>
              <li>Company</li>
              <li>
                <input
                  type="text"
                  id="name"
                  onChange={this.handleCompanyChange}
                  defaultValue={this.state.company.name}
                  placeholder="Name"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="catchPhrase"
                  onChange={this.handleCompanyChange}
                  defaultValue={this.state.company.catchPhrase}
                  placeholder="Catch Phrase"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="bs"
                  onChange={this.handleCompanyChange}
                  defaultValue={this.state.company.bs}
                  placeholder="bs"
                />
              </li>
              <li>
                <button
                  className="button"
                  onClick={this.handleSubmit}
                  value="Edit"
                >
                  UPDATE
                </button>
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
export default UpdateUser;
