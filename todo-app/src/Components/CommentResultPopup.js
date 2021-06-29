import React, {useEffect} from "react";
import { Cookies } from "react-cookie";

function CommentResultPopup(props) {
    const childComments = props.childComments;
    debugger;
    function printOneByOne(x) {
        var commentDateTemp = new Date(x.commentDate);
        var date = commentDateTemp.getDate() + "-" + (commentDateTemp.getMonth() + 1) + "-" + commentDateTemp.getFullYear();
        return (
            <tr>
                <td><strong>{x.whoseComment}:</strong>&emsp;</td>
                <td>{x.comment}&emsp;</td>
                <td className="columnWidth">{date}</td>
            </tr>
        );
    }

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner3">
                    <br></br> 
                    <div>
                        <table style={{maxWidth:"1200px"}}>
                            {childComments.length !== 0 ? childComments.map(printOneByOne) : <tr><strong><p>There is no subcomment for this comment.</p></strong></tr>}<br></br>
                        </table>
                    </div>
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

export default CommentResultPopup;