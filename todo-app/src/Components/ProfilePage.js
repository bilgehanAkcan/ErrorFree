import React, { useEffect } from "react";
import NavBar from "./NavBar";
import {Cookies} from "react-cookie"
function ProfilePage() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const [name, setName] = React.useState("");
    const [errors, setErrors] = React.useState([]);

    useEffect(() => {
        getName();
        getErrors();
      }, [])


    async function getName() {
        debugger;
        const response = await fetch("http://localhost:5000/profile/" + userId);
        const jsonData = await response.json();
        setName(jsonData[0].name);
    }

    async function getErrors() {
        debugger;
        const response = await fetch("http://localhost:5000/profileErrors/" + userId);
        const jsonData = await response.json();
        setErrors(jsonData);
    }

    return (
        <div>
            <NavBar></NavBar><br></br>
            <center>
                <h1>Hello {name}</h1>
                <u><h3>Your Errors:</h3></u><br></br>
                <div className="container">
                <table className="table table-striped">
                <thead>
                <tr>
      <td>#</td>
      <td className="table-td"><strong>Last</strong></td>
      <td className="table-td"><strong>First</strong></td>
      </tr>
      </thead>
      <tbody>
      {errors.map((error, index) => {return (
                <tr className="table-tr">
                    <td>index</td>
                    <td className="table-td">{error.errorName}</td>
                    <td className="table-td">{error.errorContent}</td>
                </tr>
        )})}
      </tbody>

                </table>
                </div>
            </center>
        </div>
    )
}

export default ProfilePage;