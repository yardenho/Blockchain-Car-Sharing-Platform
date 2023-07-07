import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { useState, state, useEffect } from "react";
import { useLocation } from "react-router-dom";

const EditVehicle = (props) => {
  const location = useLocation();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unavailableDates, setUnavailableDates] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [vehicle, setVehicle] = useState("");

  if (unavailableDates === "" && pricePerDay === "") {
    props.vehicles.map((v) => {
      console.log("v.vin");
      console.log(v.vin);

      if (v.vin === location.state.vehicle.vin) {
        console.log("in");
        const price = window.web3.utils.fromWei(
          location.state.price.toString(),
          "Ether"
        );
        setUnavailableDates(location.state.vehicle.unavailableDates);
        setPricePerDay(price);
        setVehicle(location.state.vehicle);
      }
    });
  }

  const deleteVehicle = () => {
    // make sure the vehicle has no future rentals
    if (!canBeDeleted()) {
      alert("The vehicle has future rental, so it can not be deleted");
      return;
    }
    // alert("The vehicle can be deleted");

    // delete the vehicle
    let index;
    for (let i = 0; i < props.vehicles.length; ++i) {
      if (props.vehicles[i].vin === location.state.vehicle.vin) {
        index = i + 1;
      }
    }
    props.DeleteVehicle(index);
  };

  const canBeDeleted = () => {
    // get current date
    var currentDate = new Date().getTime();

    const dates = unavailableDates;
    let datesList = [];
    if (dates !== "") {
      datesList = dates.split("#");
    }

    for (let i = 0; i < datesList.length; ++i) {
      const range = datesList[i].split("-");
      const start1 = new Date(range[0]).getTime();
      const end1 = new Date(range[1]).getTime();
      // Check for future rentals
      if (currentDate <= end1) {
        console.log("false");
        return false;
      }
    }
    return true;
  };

  const splitDates = () => {
    if (unavailableDates !== "") {
      let dates = unavailableDates.split("#");
      for (let i = 0; i < dates.length - 1; ++i) {
        dates[i] = dates[i].split("-");
        dates[i][0] = new Date(dates[i][0]);
        dates[i][1] = new Date(dates[i][1]);
        dates[i][0] =
          dates[i][0].getDate() +
          "/" +
          (dates[i][0].getMonth() + 1) +
          "/" +
          dates[i][0].getFullYear();
        dates[i][1] =
          dates[i][1].getDate() +
          "/" +
          (dates[i][1].getMonth() + 1) +
          "/" +
          dates[i][1].getFullYear();

        dates[i] = dates[i][0] + "-" + dates[i][1];
      }
      return dates;
    } else {
      return [];
    }
  };

  const check_date_overlap = (start, end) => {
    // Convert date strings to datetime objects
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
        console.log("true");
        return true;
      }
    }
    return false;
  };
  return (
    <div>
      <h1> Edit your vehicle details</h1>
      <form
        id="formId"
        onSubmit={async (event) => {
          event.preventDefault();

          if (isNaN(pricePerDay)) {
            // price per day is not a number - need to show an error message
            alert("Price per day must be a number");
            return;
          }
          if (parseInt(pricePerDay) === 0) {
            alert("Price per day must greater then 0");
            return;
          }

          const price = window.web3.utils.toWei(
            pricePerDay.toString(),
            "Ether"
          );
          let index;
          for (let i = 0; i < props.vehicles.length; ++i) {
            if (props.vehicles[i].vin === location.state.vehicle.vin) {
              index = i + 1;
            }
          }

          let li = unavailableDates;
          if (check_date_overlap(startDate, endDate) == false) {
            if (
              startDate !== "" &&
              endDate !== "" &&
              startDate !== null &&
              endDate !== null
            ) {
              li += startDate + "-" + endDate + "#";
              console.log("li + ", li);
            }
          }
          props.EditVehicle(index, li, price, 0);
        }}
      >
        <div className="form-group mr-sm-2">
          <br></br>
          <span>
            {" "}
            VIN:
            <input
              id="vin"
              type="text"
              className="form-control"
              value={vehicle.vin || ""}
              required
              readOnly={true}
            />
          </span>
          <span>
            Vehicle type:
            <input
              id="vehicleType"
              type="text"
              className="form-control"
              value={vehicle.vehicleType || ""}
              required
              readOnly={true}
            />
          </span>
          <label>Price per day: </label>
          <input
            id="pricePerDay"
            type="number"
            onChange={(e) => {
              setPricePerDay(e.target.value);
            }}
            className="form-control"
            value={pricePerDay}
            required
          />

          <span>
            Seats number:
            <input
              id="seatsNum"
              type="number"
              className="form-control"
              value={location.state.numberOfSeats.toString() || ""}
              required
              readOnly={true}
            />
          </span>
          <label>
            vehicle's gearbox type:{" "}
            <input
              id="gearboxType"
              type="text"
              className="form-control"
              value={vehicle.gearboxType || ""}
              required
              readOnly={true}
            />
          </label>
          <div>
            <label>
              vehicle's gas type:{" "}
              <input
                id="gasType"
                type="text"
                className="form-control"
                value={vehicle.gasType || ""}
                required
                readOnly={true}
              />
            </label>
          </div>
          <div>
            <label style={{ marginRight: "5px" }}>
              Add unavailable dates:{" "}
            </label>
            <DatePicker
              selected={startDate}
              onChange={(range) => {
                const [start, end] = range;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              minDate={new Date()}
            />
            <button
              type="button"
              className="button"
              style={{
                margin: "5px",
                marginLeft: "20px",
              }}
              onClick={() => {
                console.log("pressed");
                let li = unavailableDates;
                console.log(unavailableDates);

                console.log(startDate);

                console.log(endDate);
                if (check_date_overlap(startDate, endDate) == false) {
                  if (
                    startDate !== "" &&
                    endDate !== "" &&
                    startDate !== null &&
                    endDate !== null
                  ) {
                    console.log("in");
                    li += startDate + "-" + endDate + "#";
                  }
                }
                setUnavailableDates(li);
                setStartDate("");
                setEndDate("");
                console.log(unavailableDates);
              }}
            >
              Add another range
            </button>
          </div>
        </div>
        <div>
          {splitDates().map((date) => {
            return <p key={date}>{date}</p>;
          })}
        </div>
        <button type="submit" className="btn btn-primary">
          Edit Vehicle
        </button>
        <button
          type="button"
          onClick={deleteVehicle}
          style={{
            marginLeft: "10px",
            backgroundColor: "red",
            color: "white",
          }}
          className="btn"
        >
          Delete Vehicle
        </button>
      </form>
    </div>
  );
};

export default EditVehicle;
