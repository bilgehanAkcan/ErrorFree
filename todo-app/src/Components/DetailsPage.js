import React from "react";
import NavBar from "./NavBar";
import { Cookies } from "react-cookie";

function DetailsPage() {
    const cookies = new Cookies();
    const errorId = cookies.get("errorId");
    const [errorMessage, setErrorMessage] = React.useState("");

    const response = fetch("http://localhost:5000/anError/" + errorId);
    response.then(async response => {
        if(response.status == 200) {
            debugger;
            const value = await response.json();
            setErrorMessage(value.errorName);
        }
    });

    return (
        <div>
            <NavBar></NavBar>
            <h1>{errorMessage}</h1>
        </div>
    );

}

export default DetailsPage;