import React from "react";
import ReactDOM from "react-dom";
import {IoIosPerson} from "react-icons/io";
import {AiFillMail} from "react-icons/ai";
import {RiLockPasswordFill} from "react-icons/ri";

function RegistrationPage() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordAgain, setPasswordAgain] = React.useState("");

    async function register(e) {
        if ( password === passwordAgain ) {
            const body = {name,email,password};
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            e.preventDefault();
            window.location = "/";
        }
        else {
            alert("Not confirmed. Please try again.")
        }
    }

    return (
        <div>
            <form onSubmit={register}>
                <center>
                    <div className="mb-3 mt-5">
                        <h2 className="jumbotron">Sign Up</h2>
                        <table>
                            <tr><td><IoIosPerson></IoIosPerson></td><td><input type="text" className="form-control" onChange={e => setName(e.target.value)} id="floatingInput" placeholder="Name" style={{margin: 10}}/></td></tr>
                            <tr><td><AiFillMail></AiFillMail></td><td><input type="text" className="form-control" onChange={e => setEmail(e.target.value)} id="floatingInput" placeholder="Email" style={{margin: 10}}/></td></tr>
                            <tr><td><RiLockPasswordFill></RiLockPasswordFill></td><td><input type="password" className="form-control" onChange={e => setPassword(e.target.value)} id="floatingInput" placeholder="Password" style={{margin: 10}}/></td></tr>
                            <tr><td><RiLockPasswordFill></RiLockPasswordFill></td><td><input type="password" className="form-control" onChange={e => setPasswordAgain(e.target.value)} id="floatingInput" placeholder="Confirm Password" style={{margin: 10}}/></td></tr>
                        </table>
                        <br></br>
                        <button type="submit" className="btn btn-success">Register</button>
                    </div>
                </center>
            </form >
        </div>
    );
}

export default RegistrationPage;