import React, { Component } from "react";

class VehiclesList extends Component {
  render() {
    function viewVehicle(vin) {
      alert("Hello!" + vin);
    }

    return (
      <div id="content">
        <h2>Vheicles List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Price Per Day</th>
              <th scope="col">Number of seats</th>
              {/* <th scope="col">Owner</th> */}
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody id="vehiclesList">
            {this.props.vehicles.map((vehicle, key) => {
              console.log("key: " + key);
              console.log(vehicle);
              console.log(vehicle.vin);
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{vehicle.vehicleType}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      vehicle.vehiclePricePerDay.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                  <td>{vehicle.numOfSeats.toString()}</td>
                  <td>
                    <button onClick={() => viewVehicle(vehicle.vin)}>
                      View vehicle
                    </button>
                  </td>
                  {/* <td>
                    {true ? (
                      <button
                        name={vehicle.vin}
                        value={vehicle.vehiclePrice}
                        onClick={(event) => {
                          this.props.purchaseVehicle(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      >
                        BUY
                      </button>
                    ) : null}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default VehiclesList;

{
  /* <tr key={key}>
  <th scope="row">{product.id.toString()}</th>
  <td>{product.name}</td>
  <td>{window.web3.utils.fromWei(product.price.toString(), "Ether")} Eth</td>
  <td>{product.owner}</td>
  <td>
    {!product.purchased ? (
      <button
        name={product.id}
        value={product.price}
        onClick={(event) => {
          this.props.purchaseProduct(event.target.name, event.target.value);
        }}
      >
        Buy
      </button>
    ) : null}
  </td>
</tr>; */
}
