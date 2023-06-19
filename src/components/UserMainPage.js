import React, { Component } from "react";
import VehicleList from "./VehiclesList";
import RentersVehiclesList from "./RentersVehiclesList";

class UserMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.vehiclesList, //no one loggin
      flag: 0,
    };
  }

  render() {
    const upadeFlagState = () => {
      this.setState({ flag: 1 });
    };
    const searchClicked = () => {
      console.log(this.searchInput.value);
      if (this.searchInput.value === "") {
        console.log("in");
        console.log(this.props.vehiclesList);
        this.setState({ data: this.props.vehiclesList });
        this.setState({ flag: 0 });
        return;
      }
      let filterList = [];
      for (let i = 0; i < this.props.vehiclesList.length; ++i) {
        if (
          this.props.vehiclesList[i].vehicleType.toLowerCase() ===
          this.searchInput.value.toLowerCase()
        ) {
          filterList.push(this.props.vehiclesList[i]);
        }
      }
      this.setState({ data: filterList });
      this.setState({ flag: 1 });
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        // 👇 Get input value
        searchClicked();
      }
    };

    return (
      <div id="content" style={{ flex: 1 }}>
        <h1 style={{ marginTop: "20px", marginLeft: "500px" }}>
          Choose your vehicle
        </h1>
        <a
          class="nav-link mx-auto"
          href="#"
          style={{
            paddingLeft: "70px",
          }}
        >
          <input
            id="search_input"
            class="mx-auto"
            type="search"
            placeholder="Search by vehicle type"
            ref={(input) => {
              this.searchInput = input;
            }}
            onKeyUp={handleKeyDown}
          />
          <img
            src={require("../assets/search.png")}
            style={{
              width: "2vw",
              height: "2vw",
              "border-style": "hidden",
              "margin-left": "10px",
            }}
            onClick={searchClicked}
          ></img>
        </a>
        {this.state.flag == 0 ? (
          <VehicleList data={this.props.vehiclesList} />
        ) : (
          <VehicleList data={this.state.data} />
        )}
        {/* {this.state.flag == 0 ? (
          <RentersVehiclesList vehicles={this.props.vehiclesList} />
        ) : (
          <RentersVehiclesList vehicles={this.state.data} />
        )} */}
        {/* <RentersVehiclesList vehicles={this.props.vehiclesList} /> */}
        {/* <VehicleList vehicles={this.state.data} /> */}
      </div>
    );
  }
}

export default UserMainPage;
