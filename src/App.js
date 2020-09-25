import React from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import Home from "./components/Home";
import CreateFacility from "./components/CreateFacility";
import UpdateFacility from "./components/UpdateFacility";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <CreateFacility />
        </Route>
        <Route path="/update">
          <UpdateFacility />
        </Route>
      </Switch>
    </div>
  );
}

export default App;