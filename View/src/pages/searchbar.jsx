import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './searchbar.css'

function Searchbar({searchBarVis, setSearchBarVis}) {

    const [searchBar, setSearchBar] = useState("");
    const Navigate = useNavigate()

    const handleSearch = (e) => {
        setSearchBar(e.target.value);
    }

    const handleSeachSubmit = (e) => {
        setSearchBarVis(false)
        Navigate(`/products/${encodeURIComponent(searchBar.trim())}`)
    }



    return(
        <>
        <div className="SearchBar">
            <div className="closeSearchBar">
                <button  onClick={() => {setSearchBarVis(false)}}>
                    <p>close x</p>
                </button>
            </div>
            <div className="SearchInputSection">
                <form onSubmit={handleSeachSubmit}>
                    <input type="text" id="SeacrchBar" value={searchBar} placeholder="Type Something..." onChange={handleSearch} className="SearchInput" />
                </form>
            </div>
        </div>
        <div className="SearchBarOverlay" onClick={() => {setSearchBarVis(false)}}>

        </div>
        </>
    )

}

export default Searchbar