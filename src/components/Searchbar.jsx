import React from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './searchbar.css'
function Searchbar() {
    return (
        <div className="container fixed-top" style={{overflow: "hidden", width: "100%", backgroundColor: "white", marginTop: "60px" }}>
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
        </div>
    );
}

export default Searchbar
