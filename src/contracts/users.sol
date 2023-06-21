// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Users {
    string public name;
    uint public usersCount = 0;
    mapping(uint => User) public users;

    struct User {
        string userAddress;
        string fullName;
        string emailAddress;    
        uint age;
        string picture;
        string IDnumber;
        string password;
    }
    
    event UserCreated(
        string userAddress,
        string fullName,
        string emailAddress,
        uint age,
        string picture,
        string IDnumber,
        string password
    );

    event UserUpdated(
        string fullName,
        string emailAddress,
        uint age,
        string picture,
        string password
    );

    constructor() public {
        name = "Chen & Yarden final project";
    }

    function createUser(string memory _userAddress, string memory _fullName, string memory _emailAddress, uint _age, string memory _picture, string memory _IDnumber, string memory _password) public {
        // Require a valid user address
        require(bytes(_userAddress).length > 0);
        // Require a valid name
        require(bytes(_fullName).length > 0);
        // Require a valid email address
        require(bytes(_emailAddress).length > 0);
        // Require a valid age
        require(_age > 16);
        // Require a valid picture
        require(bytes(_picture).length > 0);
        // Require a valid ID number
        require(bytes(_IDnumber).length > 0);
        // Require a valid password
        require(bytes(_password).length > 0);  
        // Increment users count
        usersCount++;
        // Create the user
        users[usersCount] = User(
            _userAddress,
            _fullName,
            _emailAddress,
            _age,
            _picture,
            _IDnumber,
            _password
        );
        // Trigger an event
        emit UserCreated(
            _userAddress,
            _fullName,
            _emailAddress,
            _age,
            _picture,
            _IDnumber,
            _password
        );
    }

        function updateUser(uint _index, string memory _userAddress, string memory _IDnumber, string memory _fullName, string memory _emailAddress, uint _age, string memory _picture, string memory _password) public {
        // Require a valid user address
        require(bytes(_userAddress).length > 0);
        // Require a valid name
        require(bytes(_fullName).length > 0);
        // Require a valid email address
        require(bytes(_emailAddress).length > 0);
        // Require a valid age
        require(_age > 16);
        // Require a valid picture
        require(bytes(_picture).length > 0);
        // Require a valid ID number
        require(bytes(_password).length > 0);  
        // Make sure the index is valid
        // require(_index > 0 && _index <= usersCount);
        // Update the user
        User memory user = users[_index];

        user.fullName = _fullName;
        user.emailAddress = _emailAddress;
        user.age = _age;
        user.picture = _picture;
        user.password = _password;
        users[_index] = user;
       
        // Trigger an event
        emit UserUpdated(
            _fullName,
            _emailAddress,
            _age,
            _picture,
            _password
        );
    }
}