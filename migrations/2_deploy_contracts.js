const Marketplace = artifacts.require("Marketplace");
const Users = artifacts.require("Users");
const GarageRegistration = artifacts.require("GarageRegistration");
const VehicleDoc = artifacts.require("VehicleDoc");

module.exports = function(deployer) {
    deployer.deploy(Marketplace);
    deployer.deploy(Users);
    deployer.deploy(GarageRegistration);
    deployer.deploy(VehicleDoc);
};
