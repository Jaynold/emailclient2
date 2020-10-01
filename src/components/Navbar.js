import React, { useContext } from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import Logo from "../logo.svg";
import Filter from "./Filter";
import { FilterContext } from "../contexts/FilterContext";
import MyFilters from "./MyFilters";

const Navbar = () => {
  const filter = useContext(FilterContext);

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li
          className="nav-item"
          style={{
            overflow: "hidden",
            height: "fit-content",
            marginTop: "0.5rem",
          }}
        >
          <img src={Logo} alt="logo" />
        </li>
        <li className="nav-item">
          <NavLink exact to="/" className="link-text">
            FACILITIES
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="link-text">
            Settings
          </NavLink>
        </li>
        <li className="nav-item">
          <Filter
            customFilter={filter.setstate}
            layout="column"
            render={(setFilter) => <MyFilters setFilter={setFilter} />}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
