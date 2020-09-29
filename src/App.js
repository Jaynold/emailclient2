import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Home from "./components/Home";
import MyForm from "./components/MyForm";
import TableView from "./components/TableView";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={() => <Home />}/>
        <Route exact path="/table" component={() => <TableView />}/>
        <Route path="/create" component={(props) => <MyForm {...props} type="Create"/>} />
        <Route path="/update/:id" component={(props) => <MyForm {...props} type="Update"/>} />
        <Route path="*" component={() => <Redirect to="/"/>}/>
      </Switch>
    </div>
  );
}

export default App;