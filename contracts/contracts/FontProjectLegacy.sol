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

  uint8 constant TOTAL_DISTRIBUTION_UNITS = 100;
  uint8 constant OWNER_DISTRIBUTION_UNITS = 60;
  uint8 constant COLLABORATOR_DISTRIBUTION_UNITS = TOTAL_DISTRIBUTION_UNITS - OWNER_DISTRIBUTION_UNITS;

  // address constant MATIC_MUMBAI_CONTRACT = 0x0000000000000000000000000000000000001010;
  // address constant MATICX_MUMBAI_CONTRACT = 0x96B82B65ACF7072eFEb00502F45757F254c2a0D4;

  /// @notice IDA Library
  using IDAv1Library for IDAv1Library.InitData;
  IDAv1Library.InitData internal _idaV1;
  address private superToken;
  
  mapping(bytes32 => CreateFontProject) public idToFontProject;

  uint32 private currentIDAIndex = 0;

  constructor(ISuperfluid _host, IInstantDistributionAgreementV1 _ida, address _superToken) {

    // IDA Library Initialize.
    _idaV1 = IDAv1Library.InitData(
        _host,
        _ida
    );

    superToken = _superToken;
  }

  event NewFontProjectCreated(
    bytes32 fontId,
    string metaDataCID,
    address creatorAddress,
    uint256 mintPrice,
    uint256 createdAt,
    uint256 startDateTime
  );

  event FontProjectMinted(
    bytes32 fontId,
    uint256 tokenId
  );

  struct CreateFontProject {
    bytes32 id;
    string metaDataCID;
    address creatorAddress;
    uint256 mintPrice;
    uint256[] mints;
    address[] collaborators;

    ISuperToken idaDistributionToken;
    uint32 royaltyIDAIndex;
    // uint256[] fundingStreamIds; TBD

    uint256 createdAt;
    uint256 startDateTime;
  }

  function createNewFontProject(
    uint256 createdAt,
    uint256 startDateTime,
    uint256 mintPrice,
    string calldata metaDataCID
  ) external {
    bytes32 fontId = keccak256(
        abi.encodePacked(
            msg.sender,
            address(this),
            createdAt,
            startDateTime,
            mintPrice
        )
    );

    require(idToFontProject[fontId].startDateTime == 0, "FONT IS ALREADY REGISTERED");

    uint256[] memory mints;
    address[] memory collaborators;

    currentIDAIndex = currentIDAIndex + 1;

    ISuperToken idaDistributionToken = ISuperToken(superToken);

    CreateFontProject memory font = CreateFontProject(
        fontId,
        metaDataCID,
        msg.sender,
        mintPrice,
        mints,
        collaborators,
        idaDistributionToken,
        currentIDAIndex,
        createdAt,
        startDateTime
    );
    idToFontProject[fontId] = font;

    _idaV1.createIndex(
      font.idaDistributionToken,
      font.royaltyIDAIndex
    );

    _idaV1.updateSubscriptionUnits(
      font.idaDistributionToken,
      font.royaltyIDAIndex,
      msg.sender,
      1
    );

    emit NewFontProjectCreated(
      fontId,
      metaDataCID, 
      msg.sender,
      mintPrice, 
      createdAt,
      startDateTime
    );
  }

  function addCollaborator(bytes32 fontId, address collaborator) external {
    CreateFontProject storage font = idToFontProject[fontId];

    require(font.startDateTime != 0, "FONT NOT FOUND");
    require(font.creatorAddress == msg.sender, "ONLY FONT CREATOR CAN UPDATE COLLABORATORS");
    require(!contains(font.collaborators, collaborator), "ALREADY A COLLABORATOR");

    font.collaborators.push(collaborator);

    setFontCollaboratorProfitDistribution(font.id, COLLABORATOR_DISTRIBUTION_UNITS);
  }


  function mintFontProject(
    bytes32 fontId,
    string memory uri
  ) external payable {
    CreateFontProject storage font = idToFontProject[fontId];

    require(font.startDateTime != 0, "FONT NOT FOUND");
    require(msg.value == font.mintPrice, "NOT ENOUGH ETH SENT");


    ISETH(superToken).upgradeByETHTo{ value : msg.value }(address(this));
    // console.log("Contract Super ETH Balance", ISuperToken(superToken).balanceOf(address(this)));
    // console.log("Contract Regular Balance", address(this).balance);
    
    uint256 tokenId = fontNFT.safeMint(msg.sender, uri);
    font.mints.push(tokenId);

    distributeFontProfit(fontId);

    emit FontProjectMinted(
      fontId,
      tokenId
    );
  }

  function contains(address[] memory arr, address searchFor) private pure returns (bool) {
    for (uint256 i = 0; i < arr.length; i++) {
      if (arr[i] == searchFor) {
        return true;
      }
    }
    return false;
  }

  function setFontCollaboratorProfitDistribution(bytes32 fontId, uint128 distributionUnits) private {
    CreateFontProject memory font = idToFontProject[fontId];

    require(font.startDateTime != 0, "FONT NOT FOUND");
    require(font.creatorAddress == msg.sender, "ONLY FONT CREATOR CAN UPDATE COLLABORATOR PROFIT DISTRIBUTION");

    uint128 perCollaboratorDistributionUnits = uint128(distributionUnits / font.collaborators.length);

    for (uint256 i = 0; i < font.collaborators.length; i++) {
      _idaV1.updateSubscriptionUnits(
        font.idaDistributionToken,
        font.royaltyIDAIndex,
        font.collaborators[i],
        perCollaboratorDistributionUnits
      );
    }
  }

  function distributeFontProfit(bytes32 fontId) public {
    CreateFontProject memory font = idToFontProject[fontId];

    require(font.startDateTime != 0, "FONT NOT FOUND");

    uint256 spreaderTokenBalance = font.idaDistributionToken.balanceOf(address(this));

    // console.log("spreaderTokenBalance", spreaderTokenBalance);

    (uint256 actualDistributionAmount, ) = _idaV1.ida.calculateDistribution(
        font.idaDistributionToken,
        address(this),
        font.royaltyIDAIndex,
        spreaderTokenBalance
    );

    _idaV1.distribute(font.idaDistributionToken, font.royaltyIDAIndex, actualDistributionAmount);

    // console.log("Contract SETH balance after distribution", ISuperToken(superToken).balanceOf(address(this)));
  }
}
