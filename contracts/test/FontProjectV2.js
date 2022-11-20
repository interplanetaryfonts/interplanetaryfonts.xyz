const web3 = require('web3');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { Framework } = require("@superfluid-finance/sdk-core");
const frameworkDeployer = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-framework")
const deploySuperToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-super-token")


let admin;
let sfDeployer;
let contractsFramework;
let sf;
let nativeSuperToken;

before(async () => {
  [admin] = await ethers.getSigners();
  
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
});

describe('Font Project Contract', () => {
  it('should deploy with a zero balance', async () => {
    const FontProject = await ethers.getContractFactory('FontProjectV2');


    const FontProjectContract = await FontProject.deploy(
      sf.settings.config.hostAddress,
      sf.settings.config.idaV1Address,
    );

    const contractBalance = await ethers.provider.getBalance(FontProjectContract.address);
    expect(contractBalance).to.equal(0);
  });
});