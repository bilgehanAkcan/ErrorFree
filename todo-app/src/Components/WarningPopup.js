import React from "react";

function WarningPopup(props) {

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner2">
                    <strong><center><p>{props.text}</p></center></strong>
                    <br></br>
                    <center><button type="button" className="btn btn-danger" onClick={() => props.closePopup(false)}>Close</button></center>
                </div>
            </div>
        );
    }

    return (
        <div>
            {props.openPopup ? insidePopup() : null}
        </div>
    )
}

export default WarningPopup;