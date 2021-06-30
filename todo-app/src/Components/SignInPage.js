import React from "react";
import ReactDOM from "react-dom";
import {IoIosPerson} from "react-icons/io";
import {AiFillMail} from "react-icons/ai";
import {RiLockPasswordFill} from "react-icons/ri";
import {Link} from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import {useCookies} from "react-cookie";

function SignInPage() {
    const [cookies, setCookie] = useCookies(["userId"])
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    var temp;
    var temp2;

    async function checkLogin(e) {
        e.preventDefault();
        const body = {email, password};
        const response = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            temp = data.isValid;
            temp2 = data.userId;
            if (temp) {
                const remember = localStorage.setItem("user", temp2)
            }
            else {
                alert("Login Failed, Please Try Again");
                window.location = "/";
            }
        });
        setCookie("userId", temp2, {
            path: "/"
        });
    }

    return (
        <div>
            <form>
                <center>
                    <div className="mb-3 mt-5">
                        <h2 className="jumbotron">Sign In</h2>
                        <table>
                            <tr><td><AiFillMail></AiFillMail></td><td><input type="text" onChange={e => setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="Email" style={{margin: 10}}/></td></tr>
                            <tr><td><RiLockPasswordFill></RiLockPasswordFill></td><td><input type="password" onChange={e => setPassword(e.target.value)} className="form-control" id="floatingInput" placeholder="Password" style={{margin: 10}}/></td></tr>
                        </table>
                        <br></br>
                        
                        <button type="button" onClick={checkLogin} className="btn btn-success"><Link to="HomePage">Log In</Link></button><br></br><br></br>
                        <p style={{color: "DarkGrey"}}>Not registered? <Link to="RegistrationPage">Create an account</Link></p>
                    </div>
                </center>
            </form>
        </div>
    );
}

export default SignInPage;