import React from "react";
import {Link} from "react-router-dom"
function LogoutPopup(props) {

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner2">
                    <center>
                        <p>Are you sure you want to log out?</p>
                        <br></br>
                        <Link to="/"><button type="button" className="btn btn-success">Log Out</button></Link>&emsp;
                        <button type="button" className="btn btn-danger" onClick={() => props.closePopup(false)}>Close</button>
                    </center>
                </div>
            </div>
        )
    }

    return (
        <div>
            {props.openPopup ? insidePopup() : null}
        </div>
    )
}

export default LogoutPopup;