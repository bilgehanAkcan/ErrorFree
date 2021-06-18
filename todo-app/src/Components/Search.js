import React from "react";
import ReactDOM from "react-dom"

function Search() {
    return (
        <div>
            <nav className="navbar navbar-light mt-3">
                <div className="mx-auto" style={{width:"500px"}}> 
                    <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success ml-1" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    )

}

export default Search;