import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./NavBar";
import HomePage from "./HomePage";
import { Cookies } from "react-cookie";

function EditPage() {
    const cookies = new Cookies();
    const [header, setHeader] = React.useState("");
    const [content, setContent] = React.useState("");
    var currentDate = new Date();
    var date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();

    async function addError(e) {
        e.preventDefault();
        const userId = cookies.get("userId");
        const body = {header, content, date, userId};
        const response = await fetch('http://localhost:5000/add', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            });
        const jsonData = response.json();
        console.log(jsonData);
        window.location = "/HomePage";
    }

    return (
        <div>
            <Navbar></Navbar>
            <center>
            <div class="form-floating mt-5">
                <input type="textarea" onChange={e => {setHeader(e.target.value)}} style={{width: "700px", height: "70px"}} class="form-control" id="floatingInput" step="any" placeholder="Enter the error header..."/>
            </div>
            <div class="form-floating mt-3">
                <input type="textarea" onChange={e => {setContent(e.target.value)}} style={{width: "700px", height: "200px"}} class="form-control" step="any" id="floatingPassword" placeholder="Enter the error content..."/>
            </div>
            <button type="button" onClick={addError} className="mt-3 btn btn-success">Add</button>
            </center>
        </div>
    );
}

export default EditPage;