// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Rentals {
    string public name;
    uint public rentalsCount = 0;
    mapping(uint => Rental) public rentals;

    struct Rental {
        uint id;
        string vehicleVin;
        address payable owner;
        address payable renter;
        string rentDates;
        uint rentPrice;
        string status;
    }

    event RentalCreated(
        uint id,
        string vehicleVin,
        address payable owner,
        address payable renter,
        string rentDates,
        uint rentPrice,
        string status
    );

    event RentalUpdated(
        uint id,
        string vehicleVin,
        address payable owner,
        address payable renter,
        string rentDates,
        uint rentPrice,
        string status
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createRental(string memory _vehicleVin, address _owner, string memory _rentDates, uint _rentPrice, string memory _status) public {
        // Require a valid vehicle vin
        require(bytes(_vehicleVin).length > 0);
    
        // Require a valid rent dates
        require(bytes(_rentDates).length > 0);

        // Require a valid rent price
        require(_rentPrice > 0);

        // Increment retals count
        rentalsCount++;
        // Create the rental
        rentals[rentalsCount] = Rental(
            rentalsCount,
            _vehicleVin,
            payable(_owner),
            payable(msg.sender),
            _rentDates,
            _rentPrice,
            _status
        );
        // Trigger an event
        emit RentalCreated(
            rentalsCount,
            _vehicleVin,
            payable(_owner),
            payable(msg.sender),
            _rentDates,
            _rentPrice,
            _status
        );
    }

    function updateRental(uint _id, string memory _approved) public payable {


        // // Fetch the product
        // Document memory _document = documentations[_id];
        // // Make sure the product has a valid id
        // require(_document.id > 0 && _document.id <= documentationsCount);

        // //TODO - לבדוק האם הmsg.sender קיים לו המספר רכב הזה
        // // Mark as approved
        // _document.approved = _approved;
        // // Update the product
        // documentations[_id] = _document;
        // // Trigger an event


        // // check if the renter paying is the one that created the rental request
        // emit DocumentUpdated(
        //     documentationsCount,
        //     _document.vehicleVin,
        //     _document.garageBnNumber,
        //     _document.description,
        //     _document.date,
        //     _approved
        // );
    }

}
