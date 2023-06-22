import React, { Component } from "react";
import VehiclesList from "./VehiclesList";
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
          className="nav-link mx-auto"
          href="#"
          style={{
            paddingLeft: "70px",
          }}
        >
          <input
            id="search_input"
            className="mx-auto"
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
              borderStyle: "hidden",
              marginLeft: "10px",
            }}
            onClick={searchClicked}
          ></img>
        </a>
        {this.props.vehiclesList.length === 0 && (
          <h5>Don`t have vehicles yet</h5>
        )}

        {this.state.flag == 0 ? (
          <VehiclesList data={this.props.vehiclesList} flag={"renter"} />
        ) : (
          <VehiclesList data={this.state.data} flag={"renter"} />
        )}
      </div>
    );
  }
}

export default UserMainPage;
