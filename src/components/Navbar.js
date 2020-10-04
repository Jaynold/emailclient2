import React, { useContext } from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import Logo from "../logo.svg";
import Filter from "./Filter";
import FilterItems from "./FilterItems";
import { FacilitiesContext } from "../contexts/FaciltiesContext";

const Navbar = () => {
  const { facilities, setFiltered } = useContext(FacilitiesContext);

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
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

        <br />

        <Filter
          datasource={facilities}
          onFiltered={setFiltered}
          layout="column"
          fieldNames={["type", "isActive", "address"]} //add filter field id here
          render={(setFilter, onSearch) => (
            <FilterItems setFilter={setFilter} onSearch={onSearch} />
          )}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
