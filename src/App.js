import React from "react";
import { Switch, Route } from "react-router";
import Home from "./components/Home";
import MyForm from "./components/MyForm";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create" component={(props) => <MyForm {...props} type="Create"/>} />
        <Route path="/update" component={(props) => <MyForm {...props} type="Update"/>} />
      </Switch>
    </div>
  );
}

export default App;