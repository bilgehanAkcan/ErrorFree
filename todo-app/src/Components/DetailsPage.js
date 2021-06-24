import React from "react";
import NavBar from "./NavBar";
import { Cookies } from "react-cookie";

function DetailsPage() {
    const cookies = new Cookies();
    const errorId = cookies.get("errorId");
    const [errorDetails, setErrorDetails] = React.useState([]);

    const response = fetch("http://localhost:5000/anError/" + errorId);
    response.then(async response => {
        if(response.status == 200) {
            debugger;
            const value = await response.json();
            setErrorDetails(value);
        }
    });

    var errorDate = new Date(errorDetails.errorDate);
    var date = errorDate.getDay() + "-" + (errorDate.getMonth() + 1) + "-" + errorDate.getFullYear();

    return (
        <div>
            <NavBar></NavBar>
            <center>
                <h1 className="mt-5">{errorDetails.errorName}</h1>
                <h3>Publish Date:&nbsp;{date}</h3><hr style={{width:"800px", borderWidth:"10px", border:"3px solid red"}}></hr>
                <p>{errorDetails.errorContent}</p>
            </center>

        </div>
    );

}

export default DetailsPage;