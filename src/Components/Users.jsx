import React, { Component } from "react";
import "../scss/users.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

const API = "https://jsonplaceholder.typicode.com/users/";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.importRandom = this.importRandom.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  importRandom(e) {
    e.preventDefault();
    fetch(API + (Math.floor(Math.random() * 10) + 1))
      .then(res => {
        return res.json();
      })
      .then(res => {
        fetch("http://localhost:8000/user", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            res
          })
        });
      });
  }

  getUsers() {
    fetch(`http://localhost:8000/user/list`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          users: res.users
        });
      });
  }

  handleDelete(id) {
    fetch("http://localhost:8000/user/" + id, {
      method: "DELETE"
    })
      .then(res => res.text())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="bg-image">
        <div>
          <Navbar />
        </div>
        <div>
          <button onClick={this.importRandom} className="randomButton">
            Import random user from API
          </button>
          <button className="newButton">
            <Link className="link" to="/new">
              Create new user
            </Link>
          </button>
        </div>
        <div>
          <table className="table">
            <tbody>
              <tr>
                <th colSpan="1">Name</th>
                <th colSpan="1">E-mail</th>
                <th colSpan="1">Phone</th>
                <th colSpan="2">Actions</th>
              </tr>
              {this.state.users.map((item, key) => (
                <tr key={key}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button className="viewButton">
                      <Link className="viewButton" to={`/edit/` + item.id}>
                        View
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      className="deleteButton"
                      onClick={this.handleDelete.bind(this, item.id)}
                    >
                      <i className="fa fa-trash" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ScrollUpButton />
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default Users;
