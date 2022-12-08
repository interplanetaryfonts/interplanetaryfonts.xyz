// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "hardhat/console.sol";
import "./InterPlanetaryFontNFT.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import { ISuperfluid, ISuperfluidToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { ISETH } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ISETH.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import { IDAv1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

contract FontProject is Initializable, OwnableUpgradeable, UUPSUpgradeable {
  // State variable section 
  // Keep the state variables in the same order
  // https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#modifying-your-contracts

  InterPlanetaryFontNFT private fontNFT;
  uint32 private currentIDAIndex;
    // Map of created users
  mapping(address => User) public addressToUser;

  // Map of create font projects
  mapping(bytes32 => FontProjectEntity) public idToFontProject;

  // Map of project to project mints
  mapping(bytes32 => uint256[]) public fontProjectIdToMints;

  // End state variable section


  uint8 constant TOTAL_DISTRIBUTION_UNITS = 100;
  uint8 constant OWNER_DISTRIBUTION_UNITS = 50;
  uint8 constant COLLABORATOR_DISTRIBUTION_UNITS = TOTAL_DISTRIBUTION_UNITS - OWNER_DISTRIBUTION_UNITS;

  /// @notice IDA Library
  using IDAv1Library for IDAv1Library.InitData;
  IDAv1Library.InitData internal _idaV1;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
      _disableInitializers();
  }

  function initialize(ISuperfluid _host, IInstantDistributionAgreementV1 _ida, InterPlanetaryFontNFT _ipfToken) initializer public {
    __Ownable_init();
    __UUPSUpgradeable_init();

    currentIDAIndex = 0;

    fontNFT = _ipfToken;
    // TODO : Set reference to FontStream contract here

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
    uint32 royaltyIDAIndex;
    ISuperfluidToken idaDistributionToken;

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
    uint256 createdAt
  );

  event UserCreated(
    address walletAddress,
    string profileInfoCID,
    uint256 createdAt,
    uint256 updatedAt,
    string lensHandle
  );

  event UserEdited (
    address walletAddress,
    string profileInfoCID,
    uint256 createdAt,
    uint256 updatedAt,
    string lensHandle
  );

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

  function editUser(
    string calldata lensHandle,
    string calldata profileInfoCID,
    uint256 updatedAt
  ) external {

    require(addressToUser[msg.sender].createdAt != 0, "USER DOES NOT EXIST, PLEASE FIRST CREATE A USER USING createUser");

    User memory currentUser = addressToUser[msg.sender];

    User memory user = User(
      msg.sender,
      bytes(profileInfoCID).length == 0 ? currentUser.profileInfoCID : profileInfoCID,
      currentUser.createdAt,
      updatedAt,
      bytes(lensHandle).length == 0 ? currentUser.lensHandle : lensHandle
    );

    addressToUser[msg.sender] = user;

    emit UserEdited(
      msg.sender, 
      profileInfoCID, 
      currentUser.createdAt, 
      updatedAt, 
      lensHandle
    );
  }

  function createFontProject(
    uint256 createdAt,
    uint256 launchDateTime,
    uint256 perCharacterMintPrice,
    uint256 mintLimit,
    address distributionSuperToken,
    string calldata metaDataCID,
    string calldata fontFilesCID
  ) external {
    bytes32 fontId = keccak256(
        abi.encodePacked(
            msg.sender,
            address(this),
            createdAt,
            launchDateTime,
            perCharacterMintPrice
        )
    );

    require(idToFontProject[fontId].createdAt == 0, "FONT IS ALREADY REGISTERED");

    currentIDAIndex = currentIDAIndex + 1;

    // create font project struct
    FontProjectEntity memory font = FontProjectEntity(
        fontId,
        msg.sender,
        perCharacterMintPrice,
        metaDataCID,
        currentIDAIndex,
        ISuperfluidToken(distributionSuperToken),
        fontFilesCID,
        mintLimit,
        launchDateTime,
        createdAt,
        createdAt
    );
    idToFontProject[fontId] = font;

    // create SuperFluid IDA subscription
    _idaV1.createIndex(
      font.idaDistributionToken,
      font.royaltyIDAIndex
    );

    // Give the project created the full share of the minting royalties 
    // Once they get collaborators they still get 50% and collaborators will split
    // the other 50%
    _idaV1.updateSubscriptionUnits(
      font.idaDistributionToken,
      font.royaltyIDAIndex,
      msg.sender,
      TOTAL_DISTRIBUTION_UNITS
    );

    emitFontProjectCreated(font);
  }

  function emitFontProjectCreated(FontProjectEntity memory font) internal {
    // emit FontProjectCreated event to aid in subgraph creation
    emit FontProjectCreated(
      font.id,
      font.metaDataCID,
      font.creatorAddress,
      font.perCharacterMintPrice,
      font.mintLimit,
      font.launchDateTime,
      font.createdAt
    );
  }

  function minFontProject(

  ) external payable {

  }

  function distributeFontProfit(bytes32 fontId) public {

  }

  function addFontStreamCollaborator(
    bytes32 fontProjectId, 
    address collaborator,
    string calldata deliverablesCID,
    bytes32 fontStreamId
  ) external {

  }

  function _authorizeUpgrade(address newImplementation)
    internal
    onlyOwner
    override
  {}
}
