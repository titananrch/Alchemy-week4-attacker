const hre = require("hardhat");

async function main() {
  const Attacker = await hre.ethers.getContractFactory("Attacker");
  const attacker = await Attacker.deploy();

  await attacker.waitForDeployment();

  const address = await attacker.getAddress();
  console.log("Attacker deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
