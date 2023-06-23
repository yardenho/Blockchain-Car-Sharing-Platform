import React, { Component, useState } from "react";
import { ALL, APPROVED, DECLINED, WAITING } from "../variables.js";

const UserRentals = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [data, setData] = useState(props.rentals);
    const [flag, SetFlag] = useState(0);
    console.log("props.rentals");
    console.log(props.rentals);
    const searchClicked = () => {
        console.log(searchInput);
        if (searchInput === "") {
            console.log("in");
            console.log(props.rentals);
            setData(props.rentals);
            SetFlag(0);
            return;
        }
        let filterList = [];
        for (let i = 0; i < props.rentals.length; ++i) {
            if (props.rentals[i].vehicleVin === searchInput) {
                filterList.push(props.rentals[i]);
            }
        }
        setData(filterList);
        SetFlag(1);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // 👇 Get input value
            searchClicked();
        }
    };

    const handleFilter = (option) => {
        let filterList = [];

        if (option === ALL) {
            setData(props.rentals);
            return;
        } else if (option === WAITING) {
            props.rentals.map((rental) => {
                if (rental.status === WAITING) {
                    filterList.push(rental);
                }
            });
        } else if (option === DECLINED) {
            props.rentals.map((rental) => {
                if (rental.status === DECLINED) {
                    filterList.push(rental);
                }
            });
        } else if (option === APPROVED) {
            props.rentals.map((rental) => {
                if (rental.status === APPROVED) {
                    filterList.push(rental);
                }
            });
        } else {
            props.rentals.map((rental) => {
                if (rental.status === APPROVED_BY_OWNER) {
                    filterList.push(rental);
                }
            });
        }
        setData(filterList);
        return;
    };

    return (
        <div id="content">
            <h1>Your Vehicles Rentals</h1>
            {props.rentals.length === 0 && (
                <h5>You don`t have any rentals for your vehicles</h5>
            )}
            <div style={{ flexDirection: "row", display: "flex" }}>
                <a
                    className="nav-link mx-auto"
                    href="#"
                    style={{
                        paddingLeft: "70px",
                    }}
                >
                    {" "}
                    Search by vehicle VIN:
                    <input
                        id="search_input"
                        className="mx-auto"
                        type="search"
                        placeholder="Search by vehicle type"
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
                <select
                    name={"filter"}
                    value={filterOption} // ...force the select's value to match the state variable...
                    onChange={(event) => {
                        event.preventDefault();

                        console.log("befor contract");
                        console.log(event.target.name);
                        console.log(event.target.value);
                        handleFilter(event.target.value);
                        return false;
                    }} // ... and update the state variable on any change!
                >
                    <option value={ALL}>{ALL}</option>
                    <option value={WAITING}>{WAITING}</option>
                    <option value={APPROVED}>{APPROVED}</option>
                    <option value={DECLINED}>{DECLINED}</option>
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vehicle Vin</th>
                        <th scope="col">Rental start date</th>
                        <th scope="col">Rental end date</th>
                        <th scope="col">Renter name</th>
                        <th scope="col">Reatal price</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody id="RentalsList">
                    {data.map((rental, key) => {
                        return (
                            <tr key={key}>
                                <th scope="row">{rental.id.toString()}</th>
                                <td>{rental.vehicleVin}</td>
                                <td>{rental.rentalStartDate}</td>
                                <td>{rental.rentalEndDate}</td>
                                <td>{rental.renterName}</td>
                                <td>{rental.rentalPrice}</td>
                                <td>
                                    {rental.approved === WAITING ? (
                                        <select
                                            name={rental.id}
                                            value={rental.approved} // ...force the select's value to match the state variable...
                                            onChange={(event) => {
                                                event.preventDefault();

                                                console.log("befor contract");
                                                console.log(event.target.name);
                                                console.log(event.target.value);
                                                // this.props.updateRental( //TODO: update to the rental contract function
                                                //     event.target.name,
                                                //     event.target.value
                                                // );
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
                </tbody>
            </table>
        </div>
    );
};

export default UserRentals;
