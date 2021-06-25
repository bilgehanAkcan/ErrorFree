import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { Cookies } from "react-cookie";
import DetailsPopupButton from "./DetailsPopupButton";

function DetailsPage() {
    const cookies = new Cookies();
    const errorId = cookies.get("errorId");
    const [errorDetails, setErrorDetails] = React.useState([]);
    const [allComments, setAllComments] = React.useState([]);

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
        return errorDate.getDay() + "-" + (errorDate.getMonth() + 1) + "-" + errorDate.getFullYear();
    }

    async function getAllComments() {
        debugger;
        const response = await fetch("http://localhost:5000/allComments/" + errorId);
        const jsonData = await response.json();
    }

    return (
        <div>
            <NavBar></NavBar>
            <center>
                <h1 className="mt-5">{errorDetails[0]?.errorName}</h1>
                <h3>Publish Date:&nbsp;{getDate()}</h3>
                <DetailsPopupButton errorId={errorId}></DetailsPopupButton>
                <hr style={{width:"800px", borderWidth:"10px", border:"3px solid black"}}></hr>
                <p>{errorDetails[0]?.errorContent}</p>
                <hr style={{width:"800px", borderWidth:"10px", border:"3px solid black"}}></hr>
                {getAllComments()}
            </center>

        </div>
    );

}

export default DetailsPage;