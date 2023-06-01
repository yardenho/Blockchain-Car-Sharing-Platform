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
        bool approved;
    }

    event DocumentCreated(
        uint id,
        string vehicleVin,
        string garageBnNumber,
        string description,
        string date,
        bool approved
    );

    event DocumentApproved(
        uint id,
        string vehicleVin,
        string garageBnNumber,
        string description,
        string date,
        bool approved
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createDocument(string memory _vehicleVin, string memory _garageBnNumber, string memory _description, string memory _date, bool _approved) public {
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

    function approveDoc(uint _id) public payable {
        // Fetch the product
        Document memory _document = documentations[_id];
        // Make sure the product has a valid id
        require(_document.id > 0 && _document.id <= documentationsCount);
        // Require that the product has not been purchased already
        require(!_document.approved);
        //TODO - לבדוק האם הmsg.sender קיים לו המספר רכב הזה
        // Mark as approved
        _document.approved = true;
        // Update the product
        documentations[_id] = _document;
        // Trigger an event
        emit DocumentApproved(
            documentationsCount,
            _document.vehicleVin,
            _document.garageBnNumber,
            _document.description,
            _document.date,
            true
        );
    }

}
