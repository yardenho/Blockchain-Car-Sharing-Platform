import React, { Component } from "react";
import { APPROVED, DECLINED, WAITING } from "../variables.js";

class DocumentationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: WAITING,
            isOpen: false,
            des: "",
        };
    }

    render() {
        return (
            <div style={{ marginTop: "40px", width: "70%" }} id="content">
                <h1 style={{ marginLeft: "400px", marginBottom: "20px" }}>
                    Maintenance documentation
                </h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Vehicle Vin</th>
                            <th scope="col">Garage BN</th>
                            <th scope="col">Date</th>
                            <th scope="col">description</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody id="documentationList">
                        {this.props.docs.map((doc, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{doc.id.toString()}</th>
                                    <td>{doc.vehicleVin}</td>
                                    <td>{doc.garageBnNumber}</td>
                                    <td>{doc.date}</td>
                                    <td>
                                        <button
                                            className="button"
                                            name={doc.id}
                                            onClick={(event) => {
                                                this.setState({
                                                    isOpen: true,
                                                    des: doc.description,
                                                });

                                                // this.openDescription(
                                                //     doc.description
                                                // );
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td>
                                        {doc.approved === WAITING ? (
                                            <select
                                                name={doc.id}
                                                value={doc.approved} // ...force the select's value to match the state variable...
                                                onChange={(event) => {
                                                    event.preventDefault();

                                                    console.log(
                                                        "befor contract"
                                                    );
                                                    console.log(
                                                        event.target.name
                                                    );
                                                    console.log(
                                                        event.target.value
                                                    );
                                                    this.setState({
                                                        status:
                                                            event.target.value,
                                                    });
                                                    this.props.updateDoc(
                                                        event.target.name,
                                                        event.target.value
                                                    );
                                                    return false;
                                                }} // ... and update the state variable on any change!
                                            >
                                                <option value={WAITING}>
                                                    {WAITING}
                                                </option>
                                                <option value={APPROVED}>
                                                    {APPROVED}
                                                </option>
                                                <option value={DECLINED}>
                                                    {DECLINED}
                                                </option>
                                            </select>
                                        ) : (
                                            <p>{doc.approved}</p>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {this.state.isOpen && (
                            <dialog
                                open={this.state.isOpen}
                                style={{
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "400px",
                                    maxWidth: "90%",

                                    padding: " 20px",

                                    //   background-color: "white",
                                    //   border-radius: "5px",
                                    //   box-shadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                                }}
                            >
                                <p
                                    style={{
                                        // maxWidth: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        height: "100%",
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {this.state.des}
                                </p>
                                <button
                                    className="button"
                                    style={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                        alignSelf: "center",
                                        padding: "5px",
                                    }}
                                    onClick={() => {
                                        this.setState({ isOpen: false });
                                    }}
                                >
                                    Close
                                </button>
                            </dialog>
                        )}
                    </tbody>
                </table>
                {this.props.docs.length === 0 && (
                    <h5>You don`t have any documents for your cars</h5>
                )}
            </div>
        );
    }
}

export default DocumentationList;
