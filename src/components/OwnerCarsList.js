import React, { Component, useState } from "react";
import VehiclesList from "./VehiclesList";

const OwnerCarsList = (props) => {
    let userVehicles = [];
    const [searchInput, setSearchInput] = useState("");
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(0);
    const [d, setd] = useState(props.vehicles);

    const searchClicked = () => {
        console.log(searchInput.value);
        if (searchInput.value === "") {
            console.log("in");
            console.log(userVehicles);
            setFlag(0);
            return;
        }
        let filterList = [];
        console.log(d);
        for (let i = 0; i < d.length; ++i) {
            console.log(d[i].vin);
            if (
                d[i].vin === searchInput.value &&
                d[i].owner === props.account
            ) {
                filterList.push(d[i]);
            }
        }
        console.log(filterList);
        setData(filterList);
        setFlag(1);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // 👇 Get input value
            searchClicked();
        }
    };
    return (
        <div id="content">
            <h1 style={{ marginLeft: "600px", marginTop: "40px" }}>
                Vehicles you offer
            </h1>
            <div style={{ marginLeft: "20px" }}>
                <button
                    style={{ marginBottom: "9px", padding: "5px" }}
                    className="button"
                    onClick={() => {
                        window.location.replace("/AddVehicle");
                    }}
                >
                    {" "}
                    Add a new car for renting
                </button>
                <a
                    className="nav-link mx-auto"
                    href="#"
                    style={{
                        paddingLeft: "70px",
                        color: "black",
                    }}
                >
                    {" "}
                    Search by vehicle VIN:
                    <input
                        id="search_input"
                        className="mx-auto"
                        type="search"
                        placeholder="Search by vehicle vin"
                        ref={(input) => {
                            setSearchInput(input);
                        }}
                        onKeyUp={handleKeyDown}
                    />
                    <img
                        src={require("../assets/search.png")}
                        style={{
                            width: "2vw",
                            height: "2vw",
                            borderStyle: "hidden",
                            marginLeft: "10px",
                        }}
                        onClick={searchClicked}
                    ></img>
                </a>
            </div>
            {flag === 0 ? (
                props.vehicles.map((data1) => {
                    if (data1.owner === props.account) {
                        console.log("bla");
                        userVehicles.push(data1);
                    }
                }) && (
                    <VehiclesList
                        data={userVehicles}
                        toEdit={true}
                        flag={"owner"}
                    ></VehiclesList>
                )
            ) : (
                <VehiclesList data={data} toEdit={true} flag={"owner"} />
            )}
            {userVehicles.length === 0 && data.length === 0 && (
                <h2>You don`t have any cars for rent</h2>
            )}
        </div>
    );
};

export default OwnerCarsList;
