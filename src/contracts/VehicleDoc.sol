// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract VehicleDoc {
    string public name;
    uint public documentationsCount = 0;
    mapping(uint => Document) public documentations;

    struct Document {
        uint id;
        string vehicleVin;
        string garageBnNumber;
        string description;
        string date;
        string approved;
    }

    event DocumentCreated(
        uint id,
        string vehicleVin,
        string garageBnNumber,
        string description,
        string date,
        string approved
    );

    event DocumentUpdated(
        uint id,
        string vehicleVin,
        string garageBnNumber,
        string description,
        string date,
        string approved
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createDocument(string memory _vehicleVin, string memory _garageBnNumber, string memory _description, string memory _date, string memory _approved) public {
        // Require a valid vehicle vin
        require(bytes(_vehicleVin).length > 0);
        // Require a valid garage Bn number
        require(bytes(_garageBnNumber).length > 0);
        // Require a valid description
        require(bytes(_description).length > 0);
        // Require a valid date
        require(bytes(_date).length > 0);

        // Increment documentations count
        documentationsCount++;
        // Create the Vehicle
        documentations[documentationsCount] = Document(
            documentationsCount,
            _vehicleVin,
            _garageBnNumber,
            _description,
            _date,
            _approved
        );
        // Trigger an event
        emit DocumentCreated(
            documentationsCount,
            _vehicleVin,
            _garageBnNumber,
            _description,
            _date,
            _approved
        );
    }

    function updateDoc(uint _id, string memory _approved) public payable {
        // Fetch the product
        Document memory _document = documentations[_id];
        // Make sure the product has a valid id
        require(_document.id > 0 && _document.id <= documentationsCount);

        //TODO - לבדוק האם הmsg.sender קיים לו המספר רכב הזה
        // Mark as approved
        _document.approved = _approved;
        // Update the product
        documentations[_id] = _document;
        // Trigger an event
        emit DocumentUpdated(
            documentationsCount,
            _document.vehicleVin,
            _document.garageBnNumber,
            _document.description,
            _document.date,
            _approved
        );
    }

}
