const Marketplace = artifacts.require("Marketplace");
const Users = artifacts.require("Users");
const GarageRegistration = artifacts.require("GarageRegistration");

module.exports = function(deployer) {
    deployer.deploy(Marketplace);
    deployer.deploy(Users);
    deployer.deploy(GarageRegistration);
};
