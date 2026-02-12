import { Link, Outlet } from "react-router-dom"; // Changed from "react-router"
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import specific icons
import { faMagnifyingGlass, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import './header.css';

function Header() {

    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header_logo">
                        <p>RYET</p>
                    </div>

                    <nav class="header_catagory">
                        <ul>
                            <li>Saddles</li>
                            <li>Handlebar</li>
                            <li>Pedals</li>
                            <li>Wheels</li>
                            <li>Bike Hubs</li>
                        </ul>
                    </nav>

                    <div className="header_utilities">
                        <ul>
                            <li>
                                <button className="icon-btn" aria-label="Search">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </li>
                            <li>
                                <Link to="/account" className="icon-btn" aria-label="User account">
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </li>
                            <li>
                                <button className="icon-btn" aria-label="Cart">
                                    <FontAwesomeIcon icon={faCartArrowDown} />
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
            </header>
            <Outlet/>
        </>
    )
}

export default Header