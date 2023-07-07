// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Marketplace {
    string public name;
    uint public vehicleCount = 0;
    mapping(uint => Vehicle) public vehicles;

    struct Vehicle {
        string vin;
        string vehicleType;
        uint vehiclePricePerDay;
        address payable owner;
        string unavailableDates;
        uint numOfSeats;
        string gearboxType;
        string gasType;
        string deleteFlag;
    }

    event VehicleCreated(
        string vin,
        string vehicleType,
        uint vehiclePricePerDay,
        address payable owner,
        string unavailableDates,
        uint numOfSeats,
        string gearboxType,
        string gasType,
        string deleteFlag
    );

    event VehiclePurchased(
        string vin,
        string vehicleType,
        uint vehiclePricePerDay,
        address payable owner,
        string unavailableDates,
        uint numOfSeats,
        string gearboxType,
        string gasType,
        string deleteFlag
    );

    // event VehicleRented(
    //     string vin,
    //     string vehicleType,
    //     uint vehiclePricePerDay,
    //     address payable owner,
    //     string unavailableDates,
    //     uint numOfSeats,
    //     string gearboxType,
    //     string gasType,
    //     string deleteFlag
    // );

    event VehicleEdited(
        string vin,
        uint vehiclePricePerDay 
    );

    event VehicleDeleted(
        string vin,
        string deleteFlag
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createVehicle(string memory _vin, string memory _vehicleType, uint _price, uint _numOfSeats, string memory _gearboxType, string memory _gasType, string memory _unavailableDates) public {
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
        // Require a valid gearbox type
        require(bytes(_gasType).length > 0);
        // Increment Vehicle count
        vehicleCount++;
        // Create the Vehicle
        vehicles[vehicleCount] = Vehicle(
            _vin,
            _vehicleType,
            _price,
            payable(msg.sender),
            _unavailableDates,
            _numOfSeats,
            _gearboxType,
            _gasType,
            "false"
        );


        // Trigger an event
        emit VehicleCreated(
            _vin,
            _vehicleType,
            _price,
            payable(msg.sender),
            _unavailableDates,
            _numOfSeats,
            _gearboxType,
            _gasType,
            "false"
        );
    }

function editVehicle(uint _index, string memory _dates, uint _price) public {
        // Require a valid price
        require(_price > 0);
        // Require a valid price
        // require(bytes(_dates).length > 0);
        // Update the Vehicle
        Vehicle memory _vehicle = vehicles[_index];
        _vehicle.vehiclePricePerDay = _price;
        _vehicle.unavailableDates = _dates;
        vehicles[_index] = _vehicle;
        // Trigger an event
        emit VehicleEdited(_vehicle.vin, _vehicle.vehiclePricePerDay);
    }

  function deleteVehicle(uint _index) public {
        // delete vehicle
         Vehicle memory _vehicle = vehicles[_index];
        _vehicle.deleteFlag = "true";
        vehicles[_index] = _vehicle;
        // Trigger an event
        emit VehicleDeleted(_vehicle.vin, "true");
    }  

    // function purchaseVehicle(uint _id) public payable {

    // }
}
