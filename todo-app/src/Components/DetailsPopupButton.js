import React from "react";
import {AiOutlinePlusCircle} from "react-icons/ai";
import DetailsPopup from "./DetailsPopup"

function DetailsPopupButton(props) {
    const [popup, setPopup] = React.useState(false);
    debugger;
    function openPopup() {
        setPopup(true);
    }

    return (
        <div>
            <AiOutlinePlusCircle type="button" onClick={openPopup} size="3em" className="mt-3 btn-success"></AiOutlinePlusCircle>
            <DetailsPopup errorId={props.errorId} trigger={popup} closePopup={setPopup}></DetailsPopup>
        </div>
    )
}

export default DetailsPopupButton;