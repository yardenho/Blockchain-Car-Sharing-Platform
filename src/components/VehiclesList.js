import React, { Component } from "react";
import CarCard from "./CarCard";
class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 0,
    };
  }
  render() {
    const upadeFlagState = () => {
      this.setState({ flag: 0 });
    };
    return (
      <div
        className="row g-0"
        style={{
          flexDirection: "row",
          float: "left",
          display: "flex",
          marginBottom: "60px ",
          marginLeft: "60px ",

          elevation: "1",
          flex: "1",
        }}
      >
        {this.props.vehicles.map((vehicle, key) => {
          console.log("key is1234567890");
          console.log(this.props.vehicles);
          //   console.log(key);
          console.log(vehicle);
          if (key === 1) upadeFlagState();
          //   if (this.state.flag === 1) return <CarCard data={vehicle}></CarCard>;
          //   if (this.state.flag === 0) upadeFlagState();
        })}
      </div>
    );
  }
}

export default VehicleList;
