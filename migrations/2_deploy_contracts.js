const Marketplace = artifacts.require("Marketplace");
const Users = artifacts.require("Users");

module.exports = function(deployer) {
    deployer.deploy(Marketplace);
    deployer.deploy(Users);
};
