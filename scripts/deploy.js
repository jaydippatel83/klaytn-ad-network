const hre = require("hardhat");

async function main() {
  const klayAdSpace = await hre.ethers.deployContract("KlayAdSpace",);
  await klayAdSpace.waitForDeployment();
  console.log('deploy contract:=', klayAdSpace.target);



  const NFTMarket = await hre.ethers.deployContract("NFTMarket");
  await NFTMarket.waitForDeployment();
  console.log('NFTMarket', NFTMarket.target);  
  const TokenContract = await hre.ethers.deployContract("NFT",[NFTMarket.target]);
  await TokenContract.waitForDeployment();
  console.log(TokenContract.target, "NFT address");

  const RentFactoryContract = await hre.ethers.deployContract(
    "RentFactory"
  );
  console.log("RentFactoryContract deployed to: ", RentFactoryContract.target);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
