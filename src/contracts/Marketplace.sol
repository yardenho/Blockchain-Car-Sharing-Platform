// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Marketplace {
    string public name;
    uint public vehicleCount = 0;
    mapping(uint => Vehicle) public vehicles;

    struct Vehicle {
        uint vehicleNumber;
        string vehicleType;
        uint pricePerDay;
        address payable owner;
        string[] unaviliableDates;
    }

    event ProductCreated(
        uint vehicleNumber,
        string vehicleType,
        uint pricePerDay,
        address payable owner,
        string[] unaviliableDates
    );

    // event ProductPurchased(
    //     uint id,
    //     string name,
    //     uint price,
    //     address payable owner,
    //     bool purchased
    // );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createVehicle(string memory _vehicleNumber, uint _price) public {
        // Require a valid name
        require(bytes(_vehicleNumber).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        vehicleCount++;
        // Create the product
        vehicles[vehicleCount] = Vehicle(
            vehicleCount,
            _vehicleNumber,
            _price,
            payable(msg.sender),
            new string[](0)
        );
        // Trigger an event
        emit ProductCreated(
            vehicleCount,
            _vehicleNumber,
            _price,
            payable(msg.sender),
            new string[](0)
        );
    }

    // function purchaseProduct(uint _id) public payable {
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
    // }
}
