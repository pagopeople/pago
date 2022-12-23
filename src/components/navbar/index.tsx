import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import Search from '../Search';

import './Navbar.css';

export default function Navbar() {
    const location = useLocation();

    useEffect(() => {
        console.log(location);
    },[]);

    const getPageName = () => {
        if (location.pathname === "/") {
            return "Home";
        }
        return location.pathname[1].toUpperCase() + location.pathname.slice(2) + ' Dashboards';
    };

    return(
        <>
            <div className="navigation-container">
                <div className="nav-info">
                    <div className="nav-page-name">
                        {getPageName()}
                    </div>
                    <div className="nav-buttons">
                        <Link to="goals">
                            <span>Goals</span>
                        </Link>
                        <Link to="reviews">
                            <span>Reviews</span>
                        </Link>
                        <Link to="account">
                            <span>Account</span>
                        </Link>
                        <Link to="logout">
                            <span>Log out</span>
                        </Link>
                    </div>
                </div>
                <div className="nav-and-search" >
                    <nav className="navbar">
                        <NavLink to="/">
                            <span>Home</span>
                        </NavLink> 
                        <NavLink to="employee">
                            <span>Employee Dashboard</span>
                        </NavLink> 
                        <NavLink to="pay">
                            <span>Pay</span>
                        </NavLink> 
                        <NavLink to="performance">
                            <span>Performance</span>
                        </NavLink> 
                        <NavLink to="career">
                            <span>Career</span>
                        </NavLink> 
                        <NavLink to="other">
                            <span>Other Dashboards</span>
                        </NavLink> 
                    </nav>
                    <Search />
                </div>
            </div>
            <Outlet />
        </>
    )
}