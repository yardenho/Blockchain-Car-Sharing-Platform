// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract VehicleDoc {
    string public name;
    uint public documentationsCount = 0;
    mapping(uint => Document) public documentations;

    struct Document {
        string vehicleVin;
        string garageBnNumber;
        string description;
        bool approved;
    }

    event DocumentCreated(
        string vehicleVin,
        string garageBnNumber,
        string description,
        bool approved
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createDocument(string memory _vehicleVin, string memory _garageBnNumber, string memory _description, bool _approved) public {
        // Require a valid vehicle vin
        require(bytes(_vehicleVin).length > 0);
        // Require a valid garage Bn number
        require(bytes(_garageBnNumber).length > 0);
        // Require a valid description
        require(bytes(_description).length > 0);

        // Increment documentations count
        documentationsCount++;
        // Create the Vehicle
        documentations[documentationsCount] = Document(
            _vehicleVin,
            _garageBnNumber,
            _description,
            _approved
        );
        // Trigger an event
        emit DocumentCreated(
            _vehicleVin,
            _garageBnNumber,
            _description,
            _approved
        );
    }
}
