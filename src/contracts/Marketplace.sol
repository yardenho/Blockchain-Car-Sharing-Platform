// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Marketplace {
    string public name;
    uint public vehicleCount = 0;
    mapping(uint => Vehicle) public vehicles;

    struct Vehicle {
        uint vin;
        string vehicleType;
        uint vehiclePricePerDay;
        address payable owner;
        string[] unaviableDates;
        uint numOfSeats;
        string gearboxType;
    }

    event VehicleCreated(
        uint vin,
        string vehicleType,
        uint vehiclePricePerDay,
        address payable owner,
        string[] unaviableDates,
        uint numOfSeats,
        string gearboxType
    );

    event VehiclePurchased(
        uint vin,
        string vehicleType,
        uint vehiclePricePerDay,
        address payable owner,
        string[] unaviableDates,
        uint numOfSeats,
        string gearboxType
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createVehicle(string memory _vin, string memory _vehicleType, uint _price, uint _numOfSeats, string memory _gearboxType) public {
        // Require a valid vin
        require(bytes(_vin).length > 0);
        // Require a valid price
        require(_price > 0);
        // Require a valid vehicle type
        require(bytes(_vehicleType).length > 0);
        // Require a valid number of seats in the vehicle
        require(_numOfSeats > 0);
        // Require a valid gearbox type
        require(bytes(_gearboxType).length > 0);
        // Increment Vehicle count
        vehicleCount++;
        // Create the Vehicle
        // vehicles[vehicleCount] = Vehicle(
        //     vehicleCount,
        //     _vin,
        //     _price,
        //     payable(msg.sender),
        //     new string[](0),
        //     _numOfSeats,
        //     _gearboxType
        // );
        // // Trigger an event
        // emit VehicleCreated(
        //     vehicleCount,
        //     _vin,
        //     _price,
        //     payable(msg.sender),
        //     new string[](0),
        //     _numOfSeats,
        //     _gearboxType
        // );
    }

    function purchaseVehicle(uint _id) public payable {
    //     // Fetch the product
    //     Product memory _product = products[_id];
    //     // Fetch the owner
    //     address payable _seller = _product.owner;
    //     // Make sure the product has a valid id
    //     require(_product.id > 0 && _product.id <= productCount);
    //     // Require that there is enough Ether in the transaction
    //     require(msg.value >= _product.price);
    //     // Require that the product has not been purchased already
    //     require(!_product.purchased);
    //     // Require that the buyer is not the seller
    //     require(_seller != msg.sender);
    //     // Transfer ownership to the buyer
    //     _product.owner = payable(msg.sender);
    //     // Mark as purchased
    //     _product.purchased = true;
    //     // Update the product
    //     products[_id] = _product;
    //     // Pay the seller by sending them Ether
    //     payable(address(_seller)).transfer(msg.value);
    //     // Trigger an event
    //     emit ProductPurchased(
    //         productCount,
    //         _product.name,
    //         _product.price,
    //         payable(msg.sender),
    //         true
    //     );
    }
}


// TODO: handle string[] unaviableDates
// TODO: need to add vehicle status