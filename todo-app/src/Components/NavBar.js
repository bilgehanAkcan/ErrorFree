import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

function NavBar() {
    async function logout() {
        const response = await fetch("http://localhost:5000/logout");
        const jsonData = await response.json();
        debugger;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-secondary py-3">
                <a className="navbar-text-color">ErrorFree!</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active ml-5">
                            <a className="navbar-text-color" href="#"><Link to="HomePage">Home</Link><span class="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item ml-5">
                            <a className="navbar-text-color" href="#"><Link to="EditPage">Add</Link></a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="navbar-text-color" onClick={logout} href="#"><Link to="">Log Out</Link></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>);
}

export default NavBar;