import React from 'react';
import "./Header.css";

function Header() {
    return (
        <div className="header">
            <h2>CodeMonk</h2>
            <form className="header_form">
            <input type="text" placeholder="Search for Products..."/>
            <button>Search</button>
            <div>Sign In</div>
            <div>Sign Up</div>
            </form>
        </div>
    )
}

export default Header;
