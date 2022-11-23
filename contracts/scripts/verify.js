const hre = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

const { Framework } = require("@superfluid-finance/sdk-core")

async function main() {
  const provider = new ethers.providers.InfuraProvider(
    "maticmum",
    process.env.INFURA_ID
  );

  const { chainId } = await provider.getNetwork();
  console.log({ chainId })
  const sf = await Framework.create({
    chainId,
    provider
  });


  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: process.env.CONTRACT_ADDRESS,
    constructorArguments: [
      sf.settings.config.hostAddress,
      sf.settings.config.idaV1Address
    ],
  });
}
// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });