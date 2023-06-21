import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { useState, state, useEffect } from "react";

const EditVehicle = (props) => {
  //TODO - changing the intialization
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unavilableDates, setUnavilableDates] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [vehicle, setVehicle] = useState("");

  if (unavilableDates === "" && pricePerDay === "") {
    props.vehicles.map((v) => {
      console.log("v.vin");
      console.log(v.vin);

      if (v.vin === "1") {
        console.log("in");
        const price = window.web3.utils.fromWei(
          v.vehiclePricePerDay.toString(),
          "Ether"
        );
        setUnavilableDates(v.unaviableDates);
        setPricePerDay(price);
        setVehicle(v);
        console.log(pricePerDay);
        console.log(unavilableDates);
      }
    });
  }
  const splitDates = () => {
    if (unavilableDates !== "") {
      console.log("un");
      console.log(unavilableDates);
      let dates = unavilableDates.split("#");
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
    const dates = unavilableDates;
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
      } else {
        console.log("false");

        return false;
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
            alert("Price per daymust be a number");
            return;
          }

          const price = window.web3.utils.toWei(
            pricePerDay.toString(),
            "Ether"
          );
          let index;
          for (let i = 0; i < props.vehicles.length; ++i) {
            if (props.vehicles[i].vin === "1") {
              //to change
              index = i + 1;
            }
          }

          let li = unavilableDates;
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
          console.log("index+ " + index);
          console.log(li);
          console.log(price);
          props.EditVehicle(index, li, price);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          window.location.reload();
          // setLoading(false);
          // window.location.href = "/userMainPage";
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
              value={vehicle.numOfSeats || ""}
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
            <label style={{ marginRight: "5px" }}>Add unavilable dates: </label>
            <DatePicker
              selected={startDate}
              onChange={(range) => {
                const [start, end] = range;
                console.log(start);
                console.log(end);

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
                let li = unavilableDates;
                console.log(unavilableDates);

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
                setUnavilableDates(li);
                setStartDate("");
                setEndDate("");
                console.log(unavilableDates);
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
      </form>
    </div>
  );
};

export default EditVehicle;
