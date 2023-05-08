// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract GarageRegistration {
    string public name;
    uint public garagesCount = 0;
    mapping(uint => Garage) public garages;

    struct Garage {
        string garageName;
        string BnNumber;
        string city;
        string password;

    }
    
    event garageCreated(
        string garageName,
        string BnNumber,
        string city,
        string password
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createGarage(string memory _garageName, string memory _BnNumber, string memory _city, string memory _password) public {
        // Require a valid garage name
        require(bytes(_garageName).length > 0);
        // Require a valid Bn number
        require(bytes(_BnNumber).length > 0);
        // Require a valid city
        require(bytes(_city).length > 0);
        // Require a valid password
        require(bytes(_password).length > 0);  

        // Increment garages count
        garagesCount++;
        // Create the user
        garages[garagesCount] = Garage(
            _garageName,
            _BnNumber,
            _city,
            _password
        );
        // Trigger an event
        emit garageCreated(
            _garageName,
            _BnNumber,
            _city,
            _password
        );
    }

}