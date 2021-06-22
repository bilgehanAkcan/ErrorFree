import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import Navbar from "./NavBar";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin5Line} from "react-icons/ri";
import Popup from "./Popup";
import PopupDelete from "./PopupDelete";

function HomePage(props) {
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
        setSearchResult(jsonData);
        setValidation(true);
    }
    
    async function getError() {
        setValidation(false);
        const response = await fetch("http://localhost:5000/error");
        const jsonData = await response.json();
        setErrorList(jsonData);
        debugger;
    }

    function printAll(x) {
        return (
                <tr className="table-tr">
                    <td className="table-td">{x.errorDate}</td>
                    <td className="table-td">{x.errorName}</td>
                    <td className="table-td">{x.errorContent}</td>
                    <td>
                        <button type="button" onClick={() => { deleteId(x.id); setTemp2(x); setPopup(true)}} class="btn btn-default btn-sm">
                            <BiEdit></BiEdit>&nbsp;&nbsp;Edit
                        </button>&nbsp;
                        <button type="button" onClick={() => { deleteId(x.id); setPopup2(true)}} class="btn btn-default btn-sm">
                            <RiDeleteBin5Line></RiDeleteBin5Line>&nbsp;&nbsp;Delete
                        </button>&nbsp;&nbsp;&nbsp;
                    </td>
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
                <Popup errorElements={temp2} deleteId ={temp} trigger={popup} setTrigger={setPopup}></Popup>
                <PopupDelete deleteId={temp} trigger2={popup2} setTrigger2={setPopup2}></PopupDelete>
            </center>
        </div>
    );

}

export default HomePage;