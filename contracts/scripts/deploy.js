const hre = require('hardhat');

const { Framework } = require("@superfluid-finance/sdk-core")

async function main() {
  const provider = new ethers.providers.InfuraProvider(
    "maticmum",
    process.env.INFURA_ID
  );

  const { chainId } = await provider.getNetwork();
  console.log({chainId})
  const sf = await Framework.create({
    chainId,
    provider
  });


  const fontProjectFactory = await hre.ethers.getContractFactory("FontProjectV2");
  const fontProjectContract = await fontProjectFactory.deploy(
    sf.settings.config.hostAddress,
    sf.settings.config.idaV1Address
  );

  await fontProjectContract.deployed();
  console.log("Contract deployed to:", fontProjectContract.address);
}

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();