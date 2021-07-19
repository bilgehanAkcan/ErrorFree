import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { Cookies } from "react-cookie";
import {FiThumbsUp} from "react-icons/fi"
import {FiThumbsDown} from "react-icons/fi"
import CommentPopup from "./CommentPopup";
import {useCookies} from "react-cookie";
import CommentResultPopup from "./CommentResultPopup";

//the page you face when you press on "See Details" button on Home Page.
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
    const [childComments, setChildComments] = React.useState([]);
    const commentId = cookies.get("commentId"); 
    
    function commentCookie(x) {
        setCookie("commentId", x.id, {
            path: "/"
        });
    }

    useEffect(() => {
        showDetails();
        getAllComments();
      }, []);

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

    async function updateRate(id) {
        const response = await fetch("http://localhost:5000/rate/" + id + "/" + userId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify()
        });
        const jsonData = await response.json();
        window.location.reload();
    }

    async function updateRate2(id) {
        const response = await fetch("http://localhost:5000/rate2/" + id + "/" + userId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify()
        });
        const jsonData = await response.json();
        window.location.reload();
    }

    function printOneByOne(x) {
        var currentDate = new Date(x.commentDate);
        date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
        return (
            <tr>
                <td style={{width: "40px"}}><strong>{x.like}</strong></td>
                <td style={{width: "90px"}}><FiThumbsUp className="click" style={{color:"blue"}} onClick={()=> {commentCookie(x); updateRate(x.id)}} size="2em"></FiThumbsUp>&nbsp;&nbsp;<FiThumbsDown className="click" style={{color:"red"}} onClick={()=> {commentCookie(x); updateRate2(x.id)}} size="2em"></FiThumbsDown></td>
                <td style={{width: "70px"}}><strong>&nbsp;&nbsp;{x.dislike}</strong></td>
                <td style={{width:"100px"}}><strong>{x.whoseComment}:</strong></td>
                <td className="table-td">{x.comment}</td>
                <td className="columnWidth">{date}</td>
                <td><button className="btn btn-outline-success" onClick={() => {setTrigger(true); commentCookie(x)}}>Add Comment</button></td>&emsp;
                <td><button className="btn btn-outline-primary" onClick={() => {getChildComments(x.id); setTrigger2(true); commentCookie(x);}}>See Comments</button></td>
            </tr>
        );
    }

    async function getChildComments(commentId) {
        const response = await fetch("http://localhost:5000/childComments/" + commentId);
        const jsonData = await response.json();
        setChildComments(jsonData);
    }

    async function saveComment() {
        var currentDate = new Date();
        var date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
        const body = {comment, date, errorId, userId};
        const response = await fetch("http://localhost:5000/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        getAllComments();
        window.location.reload();
    }

    return (
        <div>
            <NavBar></NavBar>
            <center>
                <h1 className="mt-5">{errorDetails[0]?.errorName}</h1>
                <h3>Publish Date:&nbsp;{getDate()}</h3>
                <hr style={{width:"800px", borderWidth:"10px", border:"3px solid black"}}></hr>
                <h3>{errorDetails[0]?.errorContent}</h3>
                <hr style={{width:"800px", borderWidth:"10px", border:"3px solid black"}}></hr>
                <div>
                    <table className="table-comment">
                        {allComments.map(printOneByOne)}
                    </table>
                </div> 
                <br></br>
                <input type="textarea" onChange={e => setComment(e.target.value)} style={{width: "400px", height: "120px"}} className="form-control" id="floatingInput" step="any" placeholder="Write any comment"></input>
                <button type="reset" className="btn btn-success mt-3" onClick={saveComment}>Add</button>
                <CommentPopup comment={commentId} openPopup={trigger} commentOwner={userId} whichError={errorId} closePopup={setTrigger}></CommentPopup>
                <CommentResultPopup childComments={childComments} openPopup={trigger2} closePopup={setTrigger2} commentOwner={userId} whichError={errorId}></CommentResultPopup>
            </center>
        </div>
    );
}

export default DetailsPage;