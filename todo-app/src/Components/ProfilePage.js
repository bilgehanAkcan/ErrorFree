import React, { useEffect } from "react";
import NavBar from "./NavBar";
import {Cookies} from "react-cookie"

//Profile page where users can see their own errors and most liked comments.

function ProfilePage() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const [name, setName] = React.useState("");
    const [errors, setErrors] = React.useState([]);
    const [comment, setComment] = React.useState([]);
    
    useEffect(() => {
        getComment();
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

    async function getComment() {
        debugger;
        const response = await fetch("http://localhost:5000/profileComment/" + userId);
        const jsonData = await response.json();
        setComment(jsonData);
    }

    function getComment2(error) {
        debugger;
        var comm;
        var firstLike = -1;
        for (let i = 0; i < comment.length; i++) {
            if ( i == 0 && comment[i].errorId == error.id) {
                comm = comment[i].comment;
                firstLike = comment[i].like;
            }
            else if (comment[i].errorId == error.id && comment[i].like > firstLike){
                comm = comment[i].comment;
                firstLike = comment[i].like;
            }
        }
        return comm;
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
                                <td className="table-td"><strong>Error Name</strong></td>
                                <td className="table-td"><strong>Error Content</strong></td>
                                <td className="table-td"><strong>Highest Ranked Comment</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {errors.map((error, index) => { return (
                                <tr className="table-tr">
                                    <td>{index + 1}</td>
                                    <td className="table-td">{error.errorName}</td>
                                    <td className="table-td">{error.errorContent}</td>
                                    <td className="table-td">{getComment2(error)}</td>
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