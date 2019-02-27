import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Users from "./Components/Users";
import NewUser from "./Components/NewUser";
import UpdateUser from "./Components/UpdateUser";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route exact path="/new" component={NewUser} />
      <Route exact path="/edit/:id" component={UpdateUser} />
    </Switch>
  </main>
);

export default Main;
