import React from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './searchbar.css'
import Dropdown from 'react-bootstrap/Dropdown';
function Searchbar() {
    return (
        <div className="search">
            <div className="searchInputs">
            <Dropdown style={{width:"100px",height:"160px"}}>
                <Dropdown.Toggle style={{backgroundColor:"black"}} id="dropdown-basic">
                    Mumbai
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Pune</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Delhi</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Banglore</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
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
