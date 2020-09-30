import React, { useContext } from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import Logo from "../logo.svg";
import Filter from "./Filter";
import { FilterContext } from "../contexts/FilterContext";
import { Input, Select } from "antd";
import { debounce } from "lodash";

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
            filter={filter.setstate}
            layout="column"
            render={(setFilter) => {
              return (
                <>
                  <Input
                    placeholder="Filter By Type"
                    onChange={(event) =>
                      debounce(setFilter, 250, { maxWait: 500 })(
                        "type",
                        event.target.value
                      )
                    }
                  />
                  <Select
                    style={{
                      width: "100%",
                      background: "white",
                    }}
                    defaultActiveFirstOption="false"
                    allowClear
                    onChange={(value) =>
                      debounce(setFilter, 250, { maxWait: 500 })(
                        "isActive",
                        value
                      )
                    }
                    placeholder="Filter By Activity status"
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "Not Active", value: "Not Active" },
                    ]}
                  />
                  <Input
                    placeholder="Filter By Address"
                    onChange={(event) =>
                      debounce(setFilter, 250, { maxWait: 500 })(
                        "address",
                        event.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Filter By Name"
                    onChange={(event) =>
                      debounce(setFilter, 250, { maxWait: 500 })(
                        "name",
                        event.target.value
                      )
                    }
                  />
                </>
              );
            }}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
