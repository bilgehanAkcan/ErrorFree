import React, {useEffect} from "react";
import { Cookies } from "react-cookie";

function CommentResultPopup(props) {
    const [childComments, setChildComments] = React.useState([]);

    function printOneByOne(x) {
        return (
            <tr>
                <td><strong>{x.whoseComment}:</strong>&emsp;</td>
                <td>{x.comment}&emsp;</td>
                <td className="columnWidth">({x.commentDate})</td>
            </tr>
        );
    }

    async function getAllComments() {
        var commentId = props.comment;
        const response = await fetch("http://localhost:5000/childComments/" + commentId);
        const jsonData = await response.json();
        setChildComments(jsonData);
    }

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner2">
                    <br></br>
                    {getAllComments() ? 
                    <div>
                        <table style={{maxWidth:"1200px"}}>
                            {childComments.map(printOneByOne)}
                        </table>
                    </div> : null}
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