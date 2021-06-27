import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { Cookies } from "react-cookie";
import {HiOutlineArrowCircleUp} from "react-icons/hi"
import {HiOutlineArrowCircleDown} from "react-icons/hi"

function DetailsPage() {
    const cookies = new Cookies();
    const errorId = cookies.get("errorId");
    const [errorDetails, setErrorDetails] = React.useState([]);
    const [allComments, setAllComments] = React.useState([]);
    const [comment, setComment] = React.useState("");
    const userId = cookies.get("userId");
    var date;

    useEffect(() => {
            showDetails();
      }, []);

    function showDetails() {
        const response = fetch("http://localhost:5000/anError/" + errorId);
        response.then(async response => {
            if(response.status == 200) {
                debugger;
                const value = await response.json();
                setErrorDetails(value);
            }
        });
    }
    debugger;
    

    function getDate(){
        var errorDate = new Date(errorDetails[0]?.errorDate);
        return errorDate.getDate() + "-" + (errorDate.getMonth() + 1) + "-" + errorDate.getFullYear();
    }

    async function getAllComments() {
        debugger;
        const response = await fetch("http://localhost:5000/allComments/" + errorId);
        const jsonData = await response.json();
        setAllComments(jsonData);
        return true;
    }

    function printOneByOne(x) {
        var currentDate = new Date(x.commentDate);
        date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
        return (
            <tr>
                <td><HiOutlineArrowCircleUp size="2.5em"></HiOutlineArrowCircleUp><HiOutlineArrowCircleDown size="2.5em"></HiOutlineArrowCircleDown>&emsp;&emsp;</td>
                <td><strong>{x.whoseComment}:</strong>&emsp;</td>
                <td>{x.comment}&emsp;</td>
                <td>({date})</td>
            </tr>
        );
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
                <button type="button" className="btn btn-success mt-3" onClick={saveComment} >Add</button>
            </center>
            
        </div>
    );

}

export default DetailsPage;