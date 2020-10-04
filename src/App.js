import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Home from "./components/Home";
import MyForm from "./components/MyForm";
import TableView from "./components/TableView";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import FacilitiesProvider from "./contexts/FaciltiesContext";

function App() {
  return (
    <>
      <section className="content">
        <FacilitiesProvider>
          <Navbar />
          <Route exact path="/" component={() => <Home />} />
          <Switch>
            <Route exact path="/settings" component={() => <Settings />} />
            <Route exact path="/table" component={() => <TableView />} />
            <Route
              path="/create"
              component={({ history }) => (
                <MyForm {...{ type: "Create", history }} />
              )}
            />
            <Route
              path="/update/:id"
              component={({ history, location }) => (
                <MyForm
                  {...{
                    type: "Update",
                    history,
                    location,
                  }}
                />
              )}
            />
            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </FacilitiesProvider>
      </section>
    </>
  );
}

export default App;
