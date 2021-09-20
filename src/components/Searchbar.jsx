import React from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './searchbar.css'
function Searchbar() {
    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder="Enter Text"
                />
                <div className="searchIcon">
                    <SearchOutlinedIcon />
                </div>
            </div>
        </div>
    );
}

export default Searchbar
