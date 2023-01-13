const dex = artifacts.require('dex');
const nft = artifacts.require("TestNFT"); 
const token = artifacts.require("TestToken"); 
module.exports = function(deployer) {
    deployer.deploy(dex);
    deployer.deploy(token);
    deployer.deploy(nft);
};  