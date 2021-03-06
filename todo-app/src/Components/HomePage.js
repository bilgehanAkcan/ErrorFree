import React from "react";
import Navbar from "./NavBar";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin5Line} from "react-icons/ri";
import Popup from "./Popup";
import PopupDelete from "./PopupDelete";
import { Cookies } from "react-cookie";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {Link} from "react-router-dom"
import {useCookies} from "react-cookie";

//Home Page is the page where you can see all errors and search for specific error.

function HomePage() {
    const cookies = new Cookies();
    const [cookies2, setCookie] = useCookies(["errorId"]);
    const userId = cookies.get("userId");
    const [errorList, setErrorList] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [validation, setValidation] = React.useState(false);
    const [popup, setPopup] = React.useState(false);
    const [popup2, setPopup2] = React.useState(false);
    const [temp, deleteId] = React.useState(0);
    const [temp2, setTemp2] = React.useState([]);

    async function sendSearch(e) {
        e.preventDefault();
        const body = {search};
        const response = await fetch('http://localhost:5000/search', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            })
        const jsonData = await response.json();
        for (let data of jsonData) {
            var errorDate = new Date(data.errorDate);
            data.errorDateStr = errorDate.getDate() + "-" + (errorDate.getMonth() + 1) + "-" + errorDate.getFullYear()
        }
        setSearchResult(jsonData);
        setValidation(true);
    }
    
    async function getError() {
        setValidation(false);
        const response = await fetch("http://localhost:5000/error");
        const jsonData = await response.json();
        for (let data of jsonData) {
            var errorDate = new Date(data.errorDate);
            data.errorDateStr = errorDate.getDate() + "-" + (errorDate.getMonth() + 1) + "-" + errorDate.getFullYear()
        }
        setErrorList(jsonData);
    }
    

    function errorCookie(x) {
        setCookie("errorId", x.id, {
            path: "/"
        });
    }

    function enableButtons(x) {
        if ( x.userId == userId ) {
            return (
                    <td>
                        <button type="button" onClick={() => {deleteId(x.id); setTemp2(x); setPopup(true)}} className="btn btn-warning btn-default btn-sm">
                            <BiEdit></BiEdit>&nbsp;&nbsp;Edit
                        </button>&nbsp;
                        <button type="button" onClick={() => {deleteId(x.id); setPopup2(true)}} className="btn btn-default btn-danger btn-sm">
                            <RiDeleteBin5Line></RiDeleteBin5Line>&nbsp;&nbsp;Delete
                        </button>&nbsp;
                        <button type="button" style={{height:"32px"}} onClick={() => {errorCookie(x)}} className="btn btn-default btn-info btn-sm">
                            <Link to="/DetailsPage"><p style={{color: "white"}}><AiOutlineInfoCircle></AiOutlineInfoCircle>&nbsp;&nbsp;See Details</p></Link>
                        </button>&nbsp;&nbsp;&nbsp;
                    </td>
            );
        }
        else {
            return (
                <td>
                    <button type="button" onClick={() => {errorCookie(x)}} className="btn btn-default btn-info btn-sm">
                        <AiOutlineInfoCircle></AiOutlineInfoCircle>&nbsp;&nbsp;<Link to="/DetailsPage">See Details</Link>
                    </button>&nbsp;&nbsp;&nbsp;
                </td>
            );
        }
    }

    function printAll(x) {
        return (
                <tr className="table-tr">
                    <td className="table-td">{x.errorDateStr}</td>
                    <td className="table-td">{x.errorName}</td>
                    <td className="table-td">{x.errorContent}</td>
                    {enableButtons(x)}
                </tr>
        )
    }

    return (
        <div> 
            <Navbar></Navbar><br></br>
            <center><button type="button" onClick={getError}>List All Errors</button></center>
            <nav className="navbar navbar-light mt-3">
                <div className="mx-auto" style={{width:"500px"}}> 
                    <form className="d-flex">
                    <input className="form-control me-2" onChange={e => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success ml-1" onClick={sendSearch} type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <br></br>
            <br></br>
            <center>
                <table className="error-table">
                    <tr className="table-tr">
                        <th className="table-td">Date</th>
                        <th className="table-td">Error Header</th>
                        <th className="table-td">Error</th>
                        <th></th>
                    </tr>
                    {validation === false ? errorList.map(printAll) : searchResult.map(printAll)}
                </table>
                <Popup errorElements={temp2} deleteId ={temp} trigger={popup} setTrigger={setPopup} onUpdated={() => getError()}></Popup>
                <PopupDelete deleteId={temp} trigger2={popup2} setTrigger2={setPopup2} onUpdated={() => getError()}></PopupDelete>
            </center>
        </div>
    );

}

export default HomePage;