const hre = require('hardhat');

async function main() {
  console.log("Upgrading InterPlanetaryFontNFT contract...");
  const InterPlanetaryFontNFT = await ethers.getContractFactory('InterPlanetaryFontNFT');
  const interPlanetaryFontNFTInstance = await hre.upgrades.upgradeProxy(process.env.IPNFT_CONTRACT_ADDRESS, InterPlanetaryFontNFT);
  console.log("InterPlanetaryFontNFT contract upgraded:", interPlanetaryFontNFTInstance.address);

  console.log("Upgrading FontProject contract...");
  const FontProject = await hre.ethers.getContractFactory("FontProject");
  const fontProjectContractInstance = await hre.upgrades.upgradeProxy(process.env.FONT_PROJECT_CONTRACT_ADDRESS, FontProject);
  console.log("FontProject contract upgraded:", fontProjectContractInstance.address);
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