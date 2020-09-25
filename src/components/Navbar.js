import React from 'react'
import '../styles/Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink exact to="/" className="link-text">
                        HOME
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/create" className="link-text">
                        CREATE
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/update" className="link-text">
                        UPDATE
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;