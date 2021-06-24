import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { Cookies } from "react-cookie";

function NavBar() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");

    async function logout() {
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
                            <Link to="HomePage" className="navbar-text-color">Home<span class="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item ml-5">
                            <Link to="EditPage" className="navbar-text-color">Add</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="" onClick={logout} className="navbar-text-color">Log Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>);
}

export default NavBar;