import React from "react";

function PopupDelete(props) {
    async function deleteItem() {
        const temp = props.deleteId;
        const response = await fetch('http://localhost:5000/delete/' + temp, {
            method: "DELETE",
            });
        if (response.ok) {
            if (props.onUpdated) {
                props.onUpdated();
            }
        }
    }

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner2">
                    <br></br>
                    <p>Are you sure you want to delete the error?</p>
                    <button type="button" className="btn btn-success" onClick={deleteItem}>Delete</button>&nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => props.setTrigger2(false)}>Close</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            {props.trigger2 === true ? insidePopup() : null}
        </div>
    );
}

export default PopupDelete;