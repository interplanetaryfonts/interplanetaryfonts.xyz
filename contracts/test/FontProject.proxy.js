const web3 = require('web3');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { Framework } = require("@superfluid-finance/sdk-core");
const frameworkDeployer = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-framework")

let admin;
let alice;
let bob;
let sfDeployer;
let contractsFramework;
let sf;
let nativeSuperTokenAddress;
let fontProjectContractInstance;

const createdAt = 1718926200;
const updatedAt = 1718926300;

before(async () => {
  [admin, alice, bob] = await ethers.getSigners();

  // deploy superfluid contract and native super token
  sfDeployer = await frameworkDeployer.deployTestFramework();
  sfDeployer
    .connect(admin)
    .deployNativeAssetSuperToken("Super ETH", "ETHx");

  contractsFramework = await sfDeployer.getFramework();

  sf = await Framework.create({
    chainId: ethers.provider.network.chainId,
    resolverAddress: contractsFramework.resolver,
    provider: ethers.provider,
    protocolReleaseVersion: "test"
  });

  const InterPlanetaryFontNFT = await ethers.getContractFactory('InterPlanetaryFontNFT');
  const FontProject = await ethers.getContractFactory('FontProject');


  interPlanetaryFontNFTInstance = await upgrades.deployProxy(InterPlanetaryFontNFT, []);
  fontProjectContractInstance = await upgrades.deployProxy(FontProject, [
    sf.settings.config.hostAddress,
    sf.settings.config.idaV1Address,
    interPlanetaryFontNFTInstance.address,
  ]);

  const nativeSuperToken = await sf.loadNativeAssetSuperToken('ETHx');
  nativeSuperTokenAddress = nativeSuperToken.address;
});

describe('FontProject (Proxy) Contract', () => {
  it('should deploy with a zero balance', async () => {
    const contractBalance = await ethers.provider.getBalance(fontProjectContractInstance.address);
    expect(contractBalance).to.equal(0);
  });
  it('should allow for creating a user', async () => {
    const lensHandle = 'jptest.lens';
    const profileInfoCID = 'aprofileInfoCID5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi';
    const txn = await fontProjectContractInstance.connect(alice).createUser(
      lensHandle,
      profileInfoCID,
      createdAt
    );

    const wait = await txn.wait();

    // Assert UserCreated event was emitted
    expect(wait.events[0].event).to.equal('UserCreated');
    expect(wait.events[0].args.slice(0, 5)).to.deep.equal([
      alice.address,
      profileInfoCID,
      ethers.BigNumber.from(createdAt),
      ethers.BigNumber.from(createdAt),
      lensHandle
    ]);

    const user = await fontProjectContractInstance.addressToUser(alice.address);

    // Assert user was added to addressToUser map
    expect(user.slice(0, 5)).to.deep.equal([
      alice.address,
      profileInfoCID,
      ethers.BigNumber.from(createdAt),
      ethers.BigNumber.from(createdAt),
      lensHandle
    ]);
  });
  it('shouldn\'t allow creating the same user twice', async () => {
    const lensHandle = 'jptest123.lens';
    const profileInfoCID = 'aprofileInfoCID5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi';
    const createdAt = 1718926200;
    const txn = await fontProjectContractInstance.connect(bob).createUser(
      lensHandle,
      profileInfoCID,
      createdAt
    );

    await txn.wait();

    await expect(fontProjectContractInstance.connect(bob).createUser(
      lensHandle,
      profileInfoCID,
      createdAt
    )).to.be.revertedWith(
      'USER IS ALREADY REGISTERED'
    );
  });
  it('should allow for editing a user', async () => {
    const lensHandle = 'jptest.lens';
    const profileInfoCID = 'anewprofileInfoCID5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi';
    const txn = await fontProjectContractInstance.connect(alice).editUser(
      lensHandle,
      profileInfoCID,
      updatedAt
    );

    const wait = await txn.wait();

    // Assert UserCreated event was emitted
    expect(wait.events[0].event).to.equal('UserEdited');
    expect(wait.events[0].args.slice(0, 5)).to.deep.equal([
      alice.address,
      profileInfoCID,
      ethers.BigNumber.from(1718926200),
      ethers.BigNumber.from(updatedAt),
      lensHandle
    ]);

    const user = await fontProjectContractInstance.addressToUser(alice.address);

    // Assert user was added to addressToUser map
    expect(user.slice(0, 5)).to.deep.equal([
      alice.address,
      profileInfoCID,
      ethers.BigNumber.from(1718926200),
      ethers.BigNumber.from(updatedAt),
      lensHandle
    ]);
  });
  it('should allow for creating a font project', async () => {
    const launchDateTime = 1718926900;
    const perCharacterMintPrice = 1;
    const mintLimit = 100;
    const distributionSuperToken = nativeSuperTokenAddress;
    const metaDataCID = 'metaDataCID5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi';
    const fontFilesCID = 'fontFilesCID5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi';
    const royaltyIDAIndex = 1;

    const fontIdHash = ethers.utils.solidityKeccak256(
      ['address', 'address', 'uint256', 'uint256', 'uint256'],
      [alice.address, fontProjectContractInstance.address, createdAt, launchDateTime, perCharacterMintPrice]
    );

    const txn = await fontProjectContractInstance.connect(alice).createFontProject(
      createdAt,
      launchDateTime,
      perCharacterMintPrice,
      mintLimit,
      distributionSuperToken,
      metaDataCID,
      fontFilesCID
    );

    const wait = await txn.wait();
    const fontCreatedEvent = wait.events.find(({ event }) => event === 'FontProjectCreated');

    // Assert FontProjectCreated event was emitted
    expect(fontCreatedEvent.event).to.equal('FontProjectCreated');
    expect(fontCreatedEvent.args.slice(0, 7)).to.deep.equal([
      fontIdHash,
      metaDataCID,
      alice.address,
      ethers.BigNumber.from(perCharacterMintPrice),
      ethers.BigNumber.from(mintLimit),
      ethers.BigNumber.from(launchDateTime),
      ethers.BigNumber.from(createdAt)
    ]);

    const font = await fontProjectContractInstance.idToFontProject(fontIdHash);

    // // Assert font project was added to fontProjectContract map
    expect(font.slice(0, 11)).to.deep.equal([
      fontIdHash,
      alice.address,
      ethers.BigNumber.from(perCharacterMintPrice),
      metaDataCID,
      royaltyIDAIndex,
      distributionSuperToken,
      fontFilesCID,
      ethers.BigNumber.from(mintLimit),
      ethers.BigNumber.from(launchDateTime),
      ethers.BigNumber.from(createdAt),
      ethers.BigNumber.from(createdAt)
    ]);

    // expect alice to have 100 superfluid IDA distribution units on intial project creation
    let aliceSubscription = await sf.idaV1.getSubscription({
      superToken: nativeSuperTokenAddress,
      publisher: fontProjectContractInstance.address,
      indexId: royaltyIDAIndex,
      subscriber: alice.address,
      providerOrSigner: alice
    });

    await expect(aliceSubscription.units).to.equal('100');
  });
  it('shouldn\'t allow creating the same font project twice', async () => {
    const launchDateTime = 1718926900;
    const perCharacterMintPrice = 1;
    const mintLimit = 100;
    const distributionSuperToken = nativeSuperTokenAddress;
    const metaDataCID = 'metaDataCID5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi';
    const fontFilesCID = 'fontFilesCID5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi';

    const txn = await fontProjectContractInstance.connect(bob).createFontProject(
      createdAt,
      launchDateTime,
      perCharacterMintPrice,
      mintLimit,
      distributionSuperToken,
      metaDataCID,
      fontFilesCID
    );

    await txn.wait();

    await expect(fontProjectContractInstance.connect(bob).createFontProject(
      createdAt,
      launchDateTime,
      perCharacterMintPrice,
      mintLimit,
      distributionSuperToken,
      metaDataCID,
      fontFilesCID
    )).to.be.revertedWith(
      'FONT IS ALREADY REGISTERED'
    );
  });
});