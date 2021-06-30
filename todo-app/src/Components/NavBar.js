import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { Cookies } from "react-cookie";
import LogoutPopup from "./LogoutPopup";

function NavBar() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const [trigger, setTrigger] = React.useState(false);

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
                        <li className="nav-item ml-5">
                            <Link to="ProfilePage" className="navbar-text-color">My Profile</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="navbar-text-color"><button className="btn btn-light" type="button" onClick={() => setTrigger(true)}>Log Out</button></li>
                    </ul>
                </div>
            </nav>
            <LogoutPopup openPopup={trigger} closePopup={setTrigger}></LogoutPopup>
        </div>);
}

export default NavBar;