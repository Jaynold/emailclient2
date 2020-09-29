import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Home from "./components/Home";
import MyForm from "./components/MyForm";
import TableView from "./components/TableView";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";

function App() {
  return (
    <>
      <Navbar />
      <section className="content">
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/settings" component={() => <Settings />} />
          <Route exact path="/table" component={() => <TableView />} />
          <Route path="/create" component={() => <MyForm type="Create" />} />
          <Route
            path="/update/:id"
            component={() => <MyForm type="Update" />}
          />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </section>
    </>
  );
}

export default App;
