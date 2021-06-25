import React from "react";
import { Cookies } from "react-cookie";

function DetailsPopup(props) {
    const [comment, setComment] = React.useState("");
    var currentDate = new Date();
    var date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    var errorId = props.errorId;
    const cookies = new Cookies();
    const userId = cookies.get("userId");

    async function saveComment() {
        const body = {comment, date, errorId, userId};
        const response = await fetch("http://localhost:5000/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner2">
                    <br></br>
                    <input type="textarea" style={{width: "400px", height: "120px"}} onChange={e => setComment(e.target.value)} className="form-control" id="floatingInput" step="any"></input><br></br>
                    <button type="button" className="btn btn-success mt-3" onClick={saveComment} >Add</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger mt-3" onClick={() => props.closePopup(false)}>Close</button>
                </div>
            </div>
        )
    }
    debugger;

    return (
        <div>
            {props.trigger === true ? insidePopup() : null}
        </div>
    );
}

export default DetailsPopup;