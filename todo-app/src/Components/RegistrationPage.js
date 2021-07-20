import React from "react";
import ReactDOM from "react-dom";
import {IoIosPerson} from "react-icons/io";
import {AiFillMail} from "react-icons/ai";
import {RiLockPasswordFill} from "react-icons/ri";
import WarningPopup from "./WarningPopup";
import {Link} from "react-router-dom";

//The page where people can register with name, email and password.


function RegistrationPage() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordAgain, setPasswordAgain] = React.useState("");
    const [trigger, setTrigger] = React.useState(false);
    const [text, setText] = React.useState("")

    async function register(e) {
        if ( name != "" && email != "" && password != "" ) {
            if ( password === passwordAgain ) {
                const body = {name,email,password};
                const response = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            }
            else {
                setText("Not confirmed. Passwords do not match. Please try again.");
                setTrigger(true);
            }
        }
        else {
            setText("Please enter valid values for user name, email and password!");
            setTrigger(true);
        }
        
    }

    return (
        <div>
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
                        <button type="button" onClick={register} className="btn btn-success">Register</button><br></br><br></br>
                        <hr style={{width:"30%", borderWidth:"5px", border:"1px solid black"}}></hr>
                        <center><p style={{fontSize:"20px"}}><Link to="">Click</Link> to sign in</p></center>
                    </div>
                </center>
            <WarningPopup text={text} openPopup={trigger} closePopup={setTrigger}></WarningPopup>
        </div>
    );
}

export default RegistrationPage;