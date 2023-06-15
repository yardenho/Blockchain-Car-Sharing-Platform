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
        string password,
        uint res
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

        function updateUser(string memory _userAddress, string memory _fullName, string memory _emailAddress, uint _age, string memory _picture, string memory _password) public {
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
        // Update the user
        uint res = 0;
        // address _add1 =  address(bytes20(bytes(users[0].userAddress)));
        // address _add2 =  address(bytes20(bytes(users[0].userAddress)));

       for(uint i = 0 ; i< usersCount; ++i){
            string memory us = users[i].userAddress;
            bytes memory b1 = bytes(us);
            bytes memory b2 = bytes(_userAddress);
            if(b1.length == b2.length){
                res = 1;
            }
            bool a = keccak256(abi.encodePacked(us)) == keccak256(abi.encodePacked(_userAddress));
            if(a)
            {
                users[i].fullName = _fullName;
                users[i].emailAddress = _emailAddress;
                users[i].age = _age;
                users[i].picture = _picture;
                users[i].password = _password;
                res = 2;

            }
       }
        // Trigger an event
        emit UserUpdated(
            _fullName,
            _emailAddress,
            _age,
            _picture,
            _password,
            res
        );
    }
}