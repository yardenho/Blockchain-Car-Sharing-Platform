import React, { Component, useState } from "react";

class GarageMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            des: "",
        };
    }

    openDescription(des) {
        // let [isOpen, setIsOpen] = useState(true);
        console.log("in open");
        console.log(this.state.isOpen);

        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-titel"> Modal titel</h4>
                    </div>
                    <div className="modal-body">this is the body</div>
                    <div className="modal-footer">
                        <button className="button"> Close</button>
                    </div>
                </div>
            </div>
            // <Dialog
            //     open={this.state.isOpen}
            //     onClose={() => {
            //         this.setState({ isOpen: false });
            //     }}
            // >
            //     <Dialog.Panel>
            //         <Dialog.Title>Deactivate account</Dialog.Title>
            //         <Dialog.Description>
            //             This will permanently deactivate your account
            //         </Dialog.Description>

            //         <p>
            //             Are you sure you want to deactivate your account? All of
            //             your data will be permanently removed. This action
            //             cannot be undone.
            //         </p>

            //         <button
            //             onClick={() => {
            //                 this.setState({ isOpen: false });
            //             }}
            //         >
            //             Close
            //         </button>
            //     </Dialog.Panel>
            // </Dialog>
        );
    }
    render() {
        // const userVehicles = [];
        return (
            <div id="content">
                <h1 style={{ marginLeft: "500px", marginTop: "40px" }}>
                    Vehicles documentations
                </h1>
                <div>
                    <button
                        className="button"
                        style={{ marginBottom: "10px", padding: "5px" }}
                        onClick={() => {
                            window.location.replace("/vehicleDoc");
                        }}
                    >
                        Add a vehicle document
                    </button>
                </div>
                {this.props.documentations.length === 0 ? (
                    <h5>You don`t have any documents</h5>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Vehicle Vin</th>
                                <th scope="col">Garage BN</th>
                                <th scope="col">Date</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>

                        <tbody id="documentationList">
                            {this.props.documentations.map((doc, key) => {
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
                                        <td>{doc.approved}</td>
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
                                            "word-break": "break-all",
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
                )}
            </div>
        );
    }
}

export default GarageMainPage;
