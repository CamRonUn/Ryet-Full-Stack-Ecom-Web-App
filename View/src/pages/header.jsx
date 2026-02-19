import { Link, Outlet } from "react-router-dom"; // Changed from "react-router"
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import specific icons
import { faMagnifyingGlass, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import './header.css';
import { useState } from "react";
import Searchbar from './searchbar'
import Currency from './currencySelector'

function Header() {

    const [searchBarVis, setSearchBarVis ] = useState(false)

    if (searchBarVis) {
        return (
            <>
            <Searchbar searchBarVis={searchBarVis} setSearchBarVis={setSearchBarVis}/>
            <Outlet/>
            </>
        )
    }

    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header_logo">
                        <Link to='/home'>
                            <p>RYET</p>
                        </Link>
                    </div>

                    <nav className="header_catagory">
                        <ul>
                            <Link to='/catalog/Saddles'>
                                <li>Saddles</li>
                            </Link>
                            <Link to='/catalog/Handlebars'>
                                <li>Handlebar</li>
                            </Link>
                            <Link to='/catalog/Pedals'>
                                <li>Pedals</li>
                            </Link>
                            <Link to='/catalog/Wheels'>
                                <li>Wheels</li>
                            </Link>
                            <Link to='/catalog/Bike Hubs'>
                                <li>Bike Hubs</li>
                            </Link>
                        </ul>
                    </nav>

                    <div className="header_utilities">
                        <ul>
                            <Currency />
                            <li>
                                <button className="icon-btn" aria-label="Search" onClick={() => setSearchBarVis(true)}>
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
            <Outlet />
        </>
    )
}

export default Header