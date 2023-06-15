import React, { Component } from "react";
import CarCard from "./CarCard";
class VehicleList extends Component {
    render() {
        return (
            <div
                className="row g-0"
                style={{
                    flexDirection: "row",
                    float: "left",
                    display: "flex",
                    marginBottom: "60px ",
                    marginLeft: "60px ",
                    marginTop: "30px",
                    elevation: "1",
                    flex: "1",
                }}
            >
                {this.props.data.map((vehicle) => {
                    return (
                        <CarCard
                            key={vehicle.vin}
                            data={vehicle}
                            toEdit={this.props.toEdit}
                        ></CarCard>
                    );
                })}
            </div>
        );
    }
}

export default VehicleList;
