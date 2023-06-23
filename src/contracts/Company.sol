// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Company {
    string public name;
    uint public companiesCount = 0;
    mapping(uint => Company) public companies;

    struct Company {
        string companyAddress;
        string companyName;
        string BnNumber;
        string city;
        string password;

    }
    
    event companyCreated(
        string companyAddress,
        string companyName,
        string BnNumber,
        string city,
        string password
    );

    event CompanyUpdated(
        string companyName,
        string city,
        string password
    );

    constructor() public {
        name = "company registration contract";
    }

    function createCompany(string memory _companyAddress, string memory _companyName, string memory _BnNumber, string memory _city, string memory _password) public {
        // Require a valid company address
        require(bytes(_companyAddress).length > 0);
        // Require a valid company name
        require(bytes(_companyName).length > 0);
        // Require a valid Bn number
        require(bytes(_BnNumber).length > 0);
        // Require a valid city
        require(bytes(_city).length > 0);
        // Require a valid password
        require(bytes(_password).length > 0);  

        // Increment companys count
        companiesCount++;
        // Create the user
        companies[companiesCount] = Company(
            _companyAddress,
            _companyName,
            _BnNumber,
            _city,
            _password
        );
        // Trigger an event
        emit companyCreated(
            _companyAddress,
            _companyName,
            _BnNumber,
            _city,
            _password
        );
    }

    function updateCompany(uint _index, string memory _companyName,  string memory _city, string memory _password) public {
        // Require a valid company name
        require(bytes(_companyName).length > 0);
       
        // Require a valid city
        require(bytes(_city).length > 0);
        // Require a valid password
        require(bytes(_password).length > 0);  

        // Make sure the index is valid
        // require(_index > 0 && _index <= usersCount);
        // Update the user
        Company memory company = companies[_index];

        company.companyName = _companyName;
        company.city = _city;
        company.password = _password;
        companies[_index] = company;
       
        // Trigger an event
        emit CompanyUpdated(company.companyName, company.city, company.password);
    }


}