import React, { Component, useState } from "react";
import {
    ALL,
    APPROVED,
    APPROVED_BY_OWNER,
    DECLINED,
    WAITING,
} from "../variables.js";

const UserRentals = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [data, setData] = useState(props.rentals);
    const [ownerName, setOwnerName] = useState("");
    const [filterOption, setFilterOption] = useState(ALL);

    const searchClicked = () => {
        console.log(searchInput.value);
        if (searchInput.value === "") {
            console.log("in");
            console.log(props.rentals);
            setData(props.rentals);
            return;
        }
        let filterList = [];
        for (let i = 0; i < props.rentals.length; ++i) {
            if (props.rentals[i].vehicleVin === searchInput.value) {
                filterList.push(props.rentals[i]);
            }
        }
        setData(filterList);
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
        } else {
            props.rentals.map((rental) => {
                console.log(rental.status);
                console.log(option);
                if (rental.status === option) {
                    filterList.push(rental);
                }
            });
            setData(filterList);
            return;
        }
    };

    const getOwnerName = (ownerAddress) => {
        props.users.map((user) => {
            if (user.userAddress === ownerAddress.toString()) {
                if (ownerName !== user.fullName) {
                    setOwnerName(user.fullName);
                    return;
                }
            }
        });

        props.companies.map((company) => {
            if (company.companyAddress === ownerAddress.toString()) {
                if (ownerName !== company.companyName) {
                    setOwnerName(company.companyName);
                    return;
                }
            }
        });
    };

    return (
        <div id="content">
            <h1>Your Rentals</h1>
            <div style={{ flexDirection: "row", display: "flex" }}>
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
                        console.log(event.target.value);
                        setFilterOption(event.target.value);
                        handleFilter(event.target.value);
                        return false;
                    }} // ... and update the state variable on any change!
                >
                    <option value={ALL}>ALL</option>
                    <option value={WAITING}>WAITING</option>
                    <option value={APPROVED}>APPROVED</option>
                    <option value={DECLINED}>DECLINED</option>
                    <option value={APPROVED_BY_OWNER}>
                        WAITING FOR PAYMENT
                    </option>
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vehicle Vin</th>
                        <th scope="col">Rental start date</th>
                        <th scope="col">Rental end date</th>
                        <th scope="col">Owner name</th>
                        <th scope="col">Reatal price</th>
                        <th scope="col">status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody id="RentalsList">
                    {data.map((rental, key) => {
                        if (
                            rental.renter.toString().toLowerCase() ===
                            props.account.toLowerCase()
                        ) {
                            const dates = rental.rentDates.split("-");
                            dates[0] = new Date(dates[0]);
                            dates[1] = new Date(dates[1]);
                            getOwnerName(rental.owner);

                            return (
                                <tr key={key}>
                                    <th scope="row">{rental.id.toString()}</th>
                                    <td>{rental.vehicleVin}</td>
                                    <td>
                                        {dates[0].getDate() +
                                            "/" +
                                            (dates[0].getMonth() + 1) +
                                            "/" +
                                            dates[0].getFullYear()}
                                    </td>
                                    <td>
                                        {dates[1].getDate() +
                                            "/" +
                                            (dates[1].getMonth() + 1) +
                                            "/" +
                                            dates[1].getFullYear()}
                                    </td>
                                    <td>{ownerName}</td>
                                    <td>
                                        {window.web3.utils.fromWei(
                                            rental.rentPrice.toString(),
                                            "Ether"
                                        )}
                                    </td>
                                    <td>
                                        {rental.status === APPROVED_BY_OWNER ? (
                                            <button
                                                className="button"
                                                onClick={() => {
                                                    props.rentalPayment(
                                                        rental.id,
                                                        APPROVED
                                                    );
                                                }}
                                            >
                                                PAY FOR THE RENTAL
                                            </button>
                                        ) : (
                                            <p>{rental.status}</p>
                                        )}
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
            {props.rentals.length === 0 && (
                <h5>You don`t have any rentals for your vehicles</h5>
            )}
        </div>
    );
};

export default UserRentals;
