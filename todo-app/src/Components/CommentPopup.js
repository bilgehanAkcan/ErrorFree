import React from "react";
import { Cookies } from "react-cookie";

function CommentPopup(props) {
    const [comment, setComment] = React.useState("");
    
    async function sendComment() {
        debugger;
        console.log(comment);
        var currentDate = new Date();
        var errorId = props.whichError;
        var userId = props.commentOwner;
        var commentId = props.comment;
        var date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
        const body = {comment, date, errorId, userId, commentId};
        const response = await fetch("http://localhost:5000/extraComment", {
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
                    <input type="textarea" onChange={e => setComment(e.target.value)} style={{width: "400px", height: "120px"}} className="form-control" id="floatingInput" step="any"/><br></br>
                    <button type="button" onClick={sendComment} className="btn btn-success">Add</button>&nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={() => props.closePopup(false)} className="btn btn-danger">Close</button>
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

export default CommentPopup;