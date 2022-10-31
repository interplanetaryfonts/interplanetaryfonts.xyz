const hre = require('hardhat');

const { Framework } = require("@superfluid-finance/sdk-core")
const { deployFramework, deployNativeSuperToken } = require("./utils/deploy-sf.js")

async function main() {
  const [admin, alice, bob, tom] = await hre.ethers.getSigners();

  const contractsFramework = await deployFramework(admin);

  const sf = await Framework.create({
    chainId: 31337,
    provider: admin.provider,
    resolverAddress: contractsFramework.resolver, // (empty)
    protocolReleaseVersion: "test",

  });

  const seth = await deployNativeSuperToken(
    admin,
    contractsFramework.superTokenFactory,
    "ETH",
  );

  console.log("deployNativeSuperToken", seth.address);
  
  const fontProjectFactory = await hre.ethers.getContractFactory("FontProject", admin);
  const fontProjectContract = await fontProjectFactory.deploy(
    sf.settings.config.hostAddress, // Getting the Mumbai Host contract address from the Framework object
    sf.settings.config.idaV1Address,
    seth.address
  );

  await fontProjectContract.deployed();
  console.log("Contract deployed to:", fontProjectContract.address);


  let mintPrice = hre.ethers.utils.parseEther("1");
  let maxCapacity = 3;
  let timestamp = 1718926200;
  let metaDataCID = "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";


  const [deployer, address1, address2] = await hre.ethers.getSigners();

  // Create a Font
  let txn = await fontProjectContract.connect(alice).createNewFontProject(
    timestamp,
    timestamp,
    mintPrice,
    metaDataCID
  );
  
  let wait = await txn.wait();

  let createFontProjectEvent = wait.events.find(({ event }) => event === 'NewFontProjectCreated');
  console.log("FONT ID:", createFontProjectEvent.args.fontId);
  const fontId = createFontProjectEvent.args.fontId;

  // Add collaborators
  txn = await fontProjectContract.connect(alice).addCollaborator(fontId, tom.address);
  wait = await txn.wait();
  console.log("Collaborator added");

  // // Mint a font
  console.log("alice.address", alice.address);
  const a = await seth.balanceOf(alice.address);
  console.log('alice seth balance before', a.toString());

  txn = await fontProjectContract.connect(bob).mintFontProject(fontId, "some nft uri", { value: mintPrice });
  wait = await txn.wait();
  console.log("NEW FONT MINTED:");

  const b = await seth.balanceOf(alice.address);
  console.log('alice seth balance after', b.toString())


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