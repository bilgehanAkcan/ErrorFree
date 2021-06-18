import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./NavBar";
import Search from "./Search";

function HomePage() {
    const [errorName, setErrorName] = React.useState("");
    const [errorContent, setErrorContent] = React.useState("");
    const [errorDate, setErrorDate] = React.useState("");
    
    async function getError() {
        const response = await fetch("http://localhost:5000/error");
        const jsonData = await response.json();
        setErrorName(jsonData[0].errorName);
        setErrorContent(jsonData[0].errorContent);
        setErrorDate(jsonData[0].errorDate);
        getTableContents();
    }

    function getTableContents() {
        return (
                <tr>
                    <td><center>{errorName}</center></td>
                    <td><center>{errorContent}</center></td>
                    <td><center>{errorDate}</center></td>
                </tr>
        )
    }


    return (
        <div>
            <Navbar></Navbar>
            <Search></Search><br></br>
            <center><button type="button" onClick={getError}>List All Errors</button></center>
            <br></br>
            <center>
                <table className="error-table">
                    <tr className="table-tr">
                        <th className="table-td">Date</th>
                        <th className="table-td">Error Header</th>
                        <th className="table-td">Error</th>
                    </tr>
                    {getTableContents()}
                </table>
            </center>
        </div>
    );

}

export default HomePage;