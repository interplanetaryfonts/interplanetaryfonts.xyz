// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

// import "hardhat/console.sol";
import "./InterPlanetaryFontNFT.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import { ISETH } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ISETH.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {IDAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

contract FontProject {
  InterPlanetaryFontNFT private fontNFT = new InterPlanetaryFontNFT();
  // TODO : create instance of FontStream contract here

  /// @notice IDA Library
  using IDAv1Library for IDAv1Library.InitData;
  IDAv1Library.InitData internal _idaV1;
  uint32 private currentIDAIndex = 0;

  constructor(ISuperfluid _host, IInstantDistributionAgreementV1 _ida) {

    // IDA Library Initialize.
    _idaV1 = IDAv1Library.InitData(
        _host,
        _ida
    );
  }


  struct User {
    address walletAddress;
    string profileInfoCID; // email, name, website, bio description, social links
    uint256 createdAt;
    uint256 updatedAt;
    string lensHandle;
  }

  struct FontProjectEntity {
    bytes32 id;
    address creatorAddress; // foreign key to User struct
    uint256 perCharacterMintPrice;
    string metaDataCID; // name, description

    // Superfluid IDA (Immediate Distribution Agreement) related data for distributing royaltys when minting
    uint256 royaltyIDAIndex;
    ISuperToken idaDistributionToken;

    string fontFilesCID; // IPFS CID pointing to source font files
    uint256 mintLimit;

    uint256 launchDateTime;
    uint256 createdAt;
    uint256 updatedAt;
  }

  event FontProjectCreated(
    bytes32 id,
    
    string metaDataCID,
    address creatorAddress,
    
    uint256 perCharacterMintPrice,
    uint256 mintLimit,

    uint256 launchDateTime,
    uint256 createdAt,
    uint256 updatedAt
  );

  event UserCreated(
    address walletAddress,
    string profileInfoCID,
    uint256 createdAt,
    uint256 updatedAt,
    string lensHandle
  );

  // Map of created users
  mapping(address => User) public addressToUser;

  event FontProjectMinted(
    bytes32 id,
    uint256 tokenId
  );

  function createUser(
    string calldata lensHandle,
    string calldata profileInfoCID,
    uint256 createdAt
  ) external {

    require(addressToUser[msg.sender].walletAddress == address(0), "USER IS ALREADY REGISTERED");

    User memory user = User(
      msg.sender,
      profileInfoCID,
      createdAt,
      createdAt,
      lensHandle
    );

    addressToUser[msg.sender] = user;

    emit UserCreated(
      msg.sender, 
      profileInfoCID, 
      createdAt, 
      createdAt, 
      lensHandle
    );
  }


  function createFontProject(
    uint256 createdAt,
    uint256 launchDateTime,
    uint256 perCharacterMintPrice,
    uint256 mintLimit,
    string calldata metaDataCID,
    string calldata fontFilesCID
  ) external {

    // check to see if User struct exists already, if not create it

    // create font project struct

    // create SuperFluid IDA subscription 

    // emit FontProjectCreated event to aid in subgraph creation
  }

  function minFontProject(

  ) external payable {

  }

  function addCollaborator(
    bytes32 fontProjectId, 
    address collaborator,
    string calldata deliverablesCID,
    bytes32 fontStreamId
  ) external {

  }

  function distributeFontProfit(bytes32 fontId) public {

  }
}
