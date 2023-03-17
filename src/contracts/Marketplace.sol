// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Marketplace {
    string public name;
    uint public vehicleCount = 0;
    mapping(uint => Vehicle) public vehicles;

    struct Vehicle {
        uint vin;
        string vehicleType;
        uint vehiclePrice;
        address payable owner;
        string[] unaviableDates;
    }

    event VehicleCreated(
        uint vin,
        string vehicleType,
        uint vehiclePrice,
        address payable owner,
        string[] unaviableDates
    );

    event VehiclePurchased(
        uint vin,
        string vehicleType,
        uint vehiclePrice,
        address payable owner,
        string[] unaviableDates
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createVehicle(string memory _vehicleType, uint _price) public {
        // Require a valid name
        require(bytes(_vehicleType).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment Vehicle count
        vehicleCount++;
        // Create the Vehicle
        vehicles[vehicleCount] = Vehicle(
            vehicleCount,
            _vehicleType,
            _price,
            payable(msg.sender),
            new string[](0)
        );
        // Trigger an event
        emit VehicleCreated(
            vehicleCount,
            _vehicleType,
            _price,
            payable(msg.sender),
            new string[](0)
        );
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
