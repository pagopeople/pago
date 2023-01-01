import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import Search from '../Search';
import { GiOnTarget } from 'react-icons/gi';
import { MdOutlineReviews } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';

import './Navbar.css';

export default function Navbar() {
    const location = useLocation();

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
                            <span><GiOnTarget />Goals</span>
                        </Link>
                        <Link to="reviews">
                            <span><MdOutlineReviews/>Reviews</span>
                        </Link>
                        <Link to="account">
                            <span><IoPerson />Account</span>
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
                        <NavLink to="skills">
                            <span>Skills</span>
                        </NavLink>
                        <NavLink to="improvement">
                            <span>Improvement</span>
                        </NavLink>
                        <NavLink to="managers">
                            <span>Managers</span>
                        </NavLink> 
                    </nav>
                    <Search />
                </div>
            </div>
            <Outlet />
        </>
    )
}