const { ethers } = require("ethers");
const { config } = require("dotenv");
config();
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const ItemFactory = await hre.ethers.getContractFactory("ItemFactory");
  const itemFactory = await ItemFactory.deploy('', ethers.constants.AddressZero);

  await itemFactory.deployed();

  console.log("ItemFactory is deployed to:", itemFactory.address);

  const Milk = await hre.ethers.getContractFactory("Milk");
  const milk = await Milk.deploy('Milk', 'Milk', itemFactory.address);

  await milk.deployed();

  console.log("Milk is deployed to:", milk.address);
  await itemFactory.functions.setMilkContractAddress(milk.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
