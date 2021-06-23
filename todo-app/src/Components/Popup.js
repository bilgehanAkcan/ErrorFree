import React from "react";

function Popup(props) {
    const [name, setName] = React.useState("");
    const [content, setContent] = React.useState("");
    var currentDate = new Date();
    var date = currentDate;

    async function editError() {
        const temp = props.deleteId;
        const body = {name, content, date};
        debugger;
        const response = await fetch('http://localhost:5000/edit/' + temp, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            if (props.onUpdated) {
                props.onUpdated();
            }
        }
        debugger;
    }

    function insidePopup() {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <table>
                        <tr>
                            <td><input type="textarea" onChange={e => setName(e.target.value)} style={{width: "400px", height: "120px"}} class="form-control" id="floatingInput" step="any" placeholder={props.errorElements.errorName}/></td>
                            <td><input type="textarea" onChange={e => setContent(e.target.value)} style={{width: "400px", height: "120px"}} class="form-control" step="any" id="floatingPassword" placeholder={props.errorElements.errorContent}/></td>
                        </tr>
                    </table>
                    <br></br>
                    <button type="button" onClick={editError} className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-danger popup-close-button" onClick={() => props.setTrigger(false)}>Close</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            {props.trigger === true ? insidePopup() : null}
        </div>
    );
}

export default Popup;