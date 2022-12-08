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

  console.log("Deploying InterPlanetaryFontNFT contract...");
  const InterPlanetaryFontNFT = await ethers.getContractFactory('InterPlanetaryFontNFT');
  const interPlanetaryFontNFTInstance = await hre.upgrades.deployProxy(InterPlanetaryFontNFT, []);
  await interPlanetaryFontNFTInstance.deployed();
  console.log("InterPlanetaryFontNFT contract deployed to:", interPlanetaryFontNFTInstance.address);

  console.log("Deploying FontProject contract...");
  const FontProject = await hre.ethers.getContractFactory("FontProject");
  const fontProjectContractInstance = await hre.upgrades.deployProxy(FontProject, [
    sf.settings.config.hostAddress,
    sf.settings.config.idaV1Address,
    interPlanetaryFontNFTInstance.address
  ])
  await fontProjectContractInstance.deployed();
  console.log("FontProject contract deployed to:", fontProjectContractInstance.address);
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