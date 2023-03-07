import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import Search from '../Search';
import { GiOnTarget } from 'react-icons/gi';
import { MdOutlineReviews } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';
import { setAuthState } from '../../reducers/SessionSlice';

import './Navbar.css';
import { useAppSelector } from '../../hooks';
import { AuthState, Role } from '../../types';
import { useDispatch } from 'react-redux';


export default function Navbar() {
    const dispatch = useDispatch();
    const location = useLocation();

    const sessionState = useAppSelector((state) => state.sessionState);

    const getPageName = () => {
        if (location.pathname === "/") {
            return "Home";
        }
        return 'Dashboards';
    };

    return(
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

                        <span><IoPerson />{sessionState.authState === AuthState.AUTHENTICATED ? sessionState.user.givenName : "Account"}</span>
                    </Link>
                    {sessionState.authState !== AuthState.AUTHENTICATED && 
                        <Link to="login">
                            <span>Log in</span>
                        </Link>
                    }
                    
                    {sessionState.authState === AuthState.AUTHENTICATED && 
                        <Link to="logout" onClick={() => dispatch(setAuthState(AuthState.UNAUTHENTICATED))}>
                            <span>Log out</span>
                        </Link>
                    }
                </div>
            </div>
            <div className="nav-and-search" >
                <nav className="navbar">
                    <NavLink to="/">
                        <span>Home</span>
                    </NavLink> 
                    {/* <NavLink to="employee">
                        <span>Employee Dashboard</span>
                    </NavLink>  */}
                    <NavLink to="pay">
                        <span>Pay</span>
                    </NavLink> 
                    <NavLink to="performance">
                        <span>Performance</span>
                    </NavLink> 
                    {/* <NavLink to="career">
                        <span>Career</span>
                    </NavLink> 
                    <NavLink to="skills">
                        <span>Skills</span>
                    </NavLink>
                    <NavLink to="improvement">
                        <span>Improvement</span>
                    </NavLink> */}
                    {(sessionState.user.role === Role.TenantAdmin || sessionState.user.role === Role.SystemAdmin)  && <NavLink to="managers">
                        <span>Managers</span>
                    </NavLink>}
                </nav>
                <Search />
            </div>
        </div>
    )
}