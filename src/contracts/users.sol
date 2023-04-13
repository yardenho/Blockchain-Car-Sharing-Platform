// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Users {
    string public name;
    uint public usersCount = 0;
    mapping(uint => User) public users;

    struct User {
        string fullName;
        string emailAddress;    
        uint age;
        string picture;
        string IDnumber;
        string password;
    }
    
    event UserCreated(
        string fullName,
        string emailAddress,
        uint age,
        string picture,
        string IDnumber,
        string password
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createUser(string memory _fullName, string memory _emailAddress, uint _age, string memory _picture, string memory _IDnumber, string memory _password) public {
        // // Require a valid name
        require(bytes(_fullName).length > 0);
        // // Require a valid email address
        require(bytes(_emailAddress).length > 0);
        // // Require a valid age
        require(_age > 16);
        // // Require a valid picture
        require(bytes(_picture).length > 0);
        // // Require a valid ID number
        require(bytes(_IDnumber).length > 0);
        // // Require a valid password
        require(bytes(_password).length > 0);  

        // Increment users count
        usersCount++;
        // Create the user
        users[usersCount] = User(
            _fullName,
            _emailAddress,
            _age,
            _picture,
            _IDnumber,
            _password
        );
        // Trigger an event
        emit UserCreated(
            _fullName,
            _emailAddress,
            _age,
            _picture,
            _IDnumber,
            _password
        );
    }


}