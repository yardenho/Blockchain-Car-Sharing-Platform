import React, { Component, useEffect, useState } from "react";
const CompanyProfile = (props) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         curUser: 0, // 0 - garage, 1 - rental company
    //         position: 0,
    //         CompanyName: "",
    //         BnNumber: "",
    //         city: "",
    //         password: "",
    //         count1: 0,
    //     };
    // }

    const [curUser, setCurUser] = useState(0); // 0 - garage, 1 - rental company
    const [position, setPosition] = useState(0);
    const [CompanyName, setCompanyName] = useState("");
    const [BnNumber, setBnNumber] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [count, setCount] = useState("0");

    useEffect(() => {
        console.log("kjbvfbdh");
        if (count == 0) {
            for (let i = 0; i < props.companies.length; ++i) {
                console.log("companies");
                console.log(props.companies);

                if (props.companies[i].companyAddress === props.account) {
                    console.log("in if 1 ");
                    setCount(1);
                    setPosition(i);
                    setCurUser(1);
                    setCompanyName(props.companies[i].companyName);
                    setBnNumber(props.companies[i].BnNumber);
                    setCity(props.companies[i].city);
                    setPassword(props.companies[i].password);
                }
            }
            for (let i = 0; i < props.garages.length; ++i) {
                console.log("garages");
                console.log(props.garages);
                if (props.garages[i].garageAddress === props.account) {
                    console.log("in if 2 ");
                    setCount(1);
                    setPosition(i);
                    setCurUser(0);
                    setCompanyName(props.garages[i].garageName);
                    setBnNumber(props.garages[i].BnNumber);
                    setCity(props.garages[i].city);
                    setPassword(props.garages[i].password);
                }
            }
        }
    });

    return (
        <div>
            <h1>Company profile</h1>
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    //index, name, city, password
                    if (curUser == 0) {
                        //saving the garage new detalis
                        props.updateGarage(
                            position + 1,
                            CompanyName,
                            city,
                            password
                        );
                    } else {
                        //saving the company new detalis
                        props.updateCompany(
                            position + 1,
                            CompanyName,
                            city,
                            password
                        );
                    }
                }}
            >
                <div className="form-group mr-sm-2">
                    <br></br>
                    <label htmlFor="CompanyName">Company Name:</label>
                    <input
                        id="CompanyName"
                        type="text"
                        onChange={(e) => {
                            console.log("onChange");
                            console.log(e.target.value);
                            setCompanyName(e.target.value);
                        }}
                        className="form-control"
                        value={CompanyName}
                    />

                    <label htmlFor="BnNumber">Bn Number</label>
                    <input
                        id="BnNumber"
                        type="text"
                        readOnly={true}
                        className="form-control"
                        value={BnNumber}
                    />
                    <label htmlFor="city">City:</label>
                    <input
                        id="city"
                        type="text"
                        onChange={(event) => {
                            setCity(event.target.value);
                        }}
                        className="form-control"
                        value={city}
                    />
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        className="form-control"
                        value={password}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Edit details
                </button>
            </form>
        </div>
    );
};

export default CompanyProfile;
