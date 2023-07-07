import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BigNumber from "bignumber.js";
import DatePicker from "react-datepicker";
import { APPROVED, DECLINED, WAITING } from "../variables.js";

const ViewVehicleForRent = (props) => {
  const location = useLocation();
  const [status, setStatus] = useState(WAITING);
  const [isOpen, setIsOpen] = useState(false);
  const [des, setDes] = useState("");
  const [hasData, setHasData] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unavailableDates, setUnavailableDates] = useState(
    location.state.vehicle.unavailableDates
  );
  const [price, setPrice] = useState(0);
  const [ownerName, setOwnerName] = useState("");

  const updateRentPrice = (start, end) => {
    // calc the number of rent days

    var difference_in_time =
      new Date(end).getTime() - new Date(start).getTime();

    // To calculate the no. of days between two dates
    var rentDays = difference_in_time / (1000 * 3600 * 24) + 1;

    var price =
      window.web3.utils.fromWei(location.state.price.toString(), "Ether") *
      rentDays;

    if (price < 0) {
      setPrice(0);
    } else {
      setPrice(price);
    }
  };

  const check_date_overlap = (start, end) => {
    var start2 = new Date(start).getTime();
    var end2 = new Date(end).getTime();

    const dates = unavailableDates;
    let datesList = [];
    if (dates !== "") {
      datesList = dates.split("#");
    }

    for (let i = 0; i < datesList.length; ++i) {
      const range = datesList[i].split("-");
      const start1 = new Date(range[0]).getTime();
      const end1 = new Date(range[1]).getTime();
      // Check for overlapping dates
      if (
        (start1 <= end2 && end2 <= end1) ||
        (start1 <= start2 && start2 <= end1)
      ) {
        return true;
      }
    }
    return false;
  };

  const testRentData = () => {
    // canno't rent your own vehicles
    if (
      props.account.toString().toLowerCase() ===
      location.state.vehicle.owner.toString().toLowerCase()
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const ownerAddress = location.state.vehicle.owner.toString();
    props.users.map((user) => {
      if (user.userAddress === ownerAddress) {
        setOwnerName(user.fullName);
      }
    });
    props.companies.map((company) => {
      if (company.companyAddress === ownerAddress) {
        setOwnerName(company.companyName);
      }
    });
  });

  return (
    <div>
      <div style={{ marginLeft: "500px", marginTop: "50px" }}>
        <h1>View Vehicle For Rent</h1>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (testRentData() === true) {
            window.alert("You can't rent your own vehicle");
            window.location.href = "/userMainPage";
            return;
          }

          const vin = location.state.vehicle.vin;
          const owner = location.state.vehicle.owner;
          let ownerName = "";
          let renterName = "";
          props.users.map((user) => {
            if (user.userAddress === owner) {
              ownerName = user.fullName;
            } else if (user.userAddress === props.account) {
              renterName = user.fullName;
            }
          });
          if (ownerName === "") {
            props.companies.map((company) => {
              if (company.companyAddress === owner) {
                ownerName = company.companyName;
              }
            });
          }
          const rentDates = startDate + "-" + endDate;
          const status = WAITING;

          const rentPrice = window.web3.utils.toWei(price.toString(), "Ether");

          props.createRental(
            vin,
            owner,
            rentDates,
            rentPrice,
            status,
            ownerName,
            renterName
          );
        }}
      >
        <div
          id="content"
          style={{
            width: "100%",
            margin: "3px",
            flexDirection: "row",
            display: "flex",
            marginTop: "75px",
          }}
        >
          <div
            className="clean-product-item"
            style={{
              fontSize: 25,
              marginLeft: "200px",
              marginTop: "50px",
            }}
          >
            <a
              id="vehicle_type"
              className="d-lg-flex justify-content-lg-center product-name"
              style={{ color: "var(--bs-gray-800)" }}
            >
              Vehicle Type:{location.state.vehicle.vehicleType}
            </a>
            <div
              id="vehicle_numOfSeats"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>
                Number of seats: {location.state.numberOfSeats.toString()}
              </span>
            </div>
            <div
              id="product_gearboxType"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Gear box type: {location.state.vehicle.gearboxType}</span>
            </div>
            <div
              id="product_gasType"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Gas type: {location.state.vehicle.gasType}</span>
            </div>
            <div className="d-lg-flex justify-content-lg-center product-price">
              <span id="product_price">
                Vehicle price per day:{" "}
                {window.web3.utils.fromWei(
                  location.state.price.toString(),
                  "Ether"
                )}{" "}
                Eth
              </span>
            </div>
            <div
              id="vehicle_numOfSeats"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Owner name: {ownerName}</span>
            </div>
            <div className="d-lg-flex justify-content-lg-center product-rentDates">
              <label style={{ marginRight: "5px" }}>Choose rent dates: </label>
              <DatePicker
                selected={startDate}
                onChange={(range) => {
                  const [start, end] = range;

                  setStartDate(start);
                  setEndDate(end);
                  if (end != null) {
                    if (check_date_overlap(startDate, endDate) === false) {
                      console.log("the date is available");
                      console.log(endDate);
                      updateRentPrice(start, end);
                    } else {
                      window.alert("The dates are unavailable");
                      console.log("the date is unavailable");
                      setPrice(0);
                    }
                  }
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={new Date()}
              />
            </div>
            <div
              id="rent_price"
              className="d-lg-flex justify-content-lg-center product-price"
            >
              <label>Price: {price.toString()}</label>
            </div>
            <div>
              <button
                type="submit"
                disabled={price <= 0}
                className="button"
                style={{
                  marginLeft: "200px",
                  fontSize: "30",
                  padding: "5px",
                }}
              >
                Rent
              </button>
            </div>
          </div>
          <div
            id="image_field"
            className="image"
            style={{ marginLeft: "50px" }}
          >
            <a>
              <img
                id="vehicle_image"
                className="img-fluid d-block mx-auto"
                src={require("../assets/vehicle.jpg")}
                style={{ width: "500px", height: " 300px" }}
              />
            </a>
          </div>
        </div>
      </form>
      <h5 style={{ marginTop: "30px", marginBottom: "20px" }}>
        {" "}
        Documentation list of this vehicle:{" "}
      </h5>
      <table style={{ marginTop: "20px" }} className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Vehicle Vin</th>
            <th scope="col">Garage BN</th>
            <th scope="col">Date</th>
            <th scope="col">description</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody id="documentationList">
          {props.docs.map((doc, key) => {
            if (doc.vehicleVin === location.state.vehicle.vin) {
              if (hasData === 0) {
                setHasData(1);
              }
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
                        setIsOpen(true);
                        setDes(doc.description);
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td>{doc.approved}</td>
                </tr>
              );
            }
          })}
          {isOpen && (
            <dialog
              open={isOpen}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                maxWidth: "90%",
                padding: " 20px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  height: "100%",
                  wordBreak: "break-all",
                }}
              >
                {des}
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
                  setIsOpen(false);
                }}
              >
                Close
              </button>
            </dialog>
          )}
        </tbody>
      </table>
      {hasData === 0 && <h5>This vehicle don`t have any documents yet</h5>}
    </div>
  );
};

export default ViewVehicleForRent;
