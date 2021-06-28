import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { Cookies } from "react-cookie";
import {FiThumbsUp} from "react-icons/fi"
import {FiThumbsDown} from "react-icons/fi"
import CommentPopup from "./CommentPopup";
import {useCookies} from "react-cookie";
import CommentResultPopup from "./CommentResultPopup";

function DetailsPage() {
    const cookies = new Cookies();
    const [cookies3, setCookie] = useCookies(["commentId"]);
    const errorId = cookies.get("errorId");
    const [errorDetails, setErrorDetails] = React.useState([]);
    const [allComments, setAllComments] = React.useState([]);
    const [comment, setComment] = React.useState("");
    const userId = cookies.get("userId");
    var date;
    const [trigger, setTrigger] = React.useState(false);
    const [trigger2, setTrigger2] = React.useState(false);
    const commentId = cookies.get("commentId");    

    useEffect(() => {
        showDetails();
      }, []);

    function commentCookie(x) {
        setCookie("commentId", x.id, {
            path: "/"
        });
    }

    function showDetails() {
        const response = fetch("http://localhost:5000/anError/" + errorId);
        response.then(async response => {
            if(response.status == 200) {
                const value = await response.json();
                setErrorDetails(value);
            }
        });
    }
    

    function getDate(){
        var errorDate = new Date(errorDetails[0]?.errorDate);
        return errorDate.getDate() + "-" + (errorDate.getMonth() + 1) + "-" + errorDate.getFullYear();
    }

    async function getAllComments(x) {
        const response = await fetch("http://localhost:5000/allComments/" + errorId);
        const jsonData = await response.json();
        setAllComments(jsonData);
    }


    function printOneByOne(x) {
        var currentDate = new Date(x.commentDate);
        date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
        return (
            <tr>
                <td className="columnWidth"><FiThumbsUp size="1.5em"></FiThumbsUp>&nbsp;&nbsp;<FiThumbsDown size="1.5em"></FiThumbsDown>&emsp;&emsp;</td>
                <td><strong>{x.whoseComment}:</strong>&emsp;</td>
                <td>{x.comment}&emsp;</td>
                <td className="columnWidth">({date})</td>
                <td><button onClick={() => {setTrigger(true); commentCookie(x)}}>Add Comment</button></td>
                <td><button onClick={() => {setTrigger2(true); commentCookie(x)}}>See Comments</button></td>
            </tr>
        );
    }

    async function saveComment() {
        debugger;
        var currentDate = new Date();
        var date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
        const body = {comment, date, errorId, userId};
        const response = await fetch("http://localhost:5000/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }

    return (
        <div>
            <NavBar></NavBar>
            <center>
                <h1 className="mt-5">{errorDetails[0]?.errorName}</h1>
                <h3>Publish Date:&nbsp;{getDate()}</h3>
                <hr style={{width:"800px", borderWidth:"10px", border:"3px solid black"}}></hr>
                <p>{errorDetails[0]?.errorContent}</p>
                <hr style={{width:"800px", borderWidth:"10px", border:"3px solid black"}}></hr>
                {getAllComments() ? 
                <div>
                    <table>
                        {allComments.map(printOneByOne)}
                    </table>
                </div> : null}
                <br></br>
                <input type="textarea" onChange={e => setComment(e.target.value)} style={{width: "400px", height: "120px"}} className="form-control" id="floatingInput" step="any" placeholder="Write any comment"></input>
                <button type="reset" className="btn btn-success mt-3" onClick={saveComment}>Add</button>
                <CommentPopup comment={commentId} openPopup={trigger} commentOwner={userId} whichError={errorId} closePopup={setTrigger}></CommentPopup>
                <CommentResultPopup comment={commentId} openPopup={trigger2} closePopup={setTrigger2} commentOwner={userId} whichError={errorId}></CommentResultPopup>
            </center>
            
        </div>
    );

}

export default DetailsPage;