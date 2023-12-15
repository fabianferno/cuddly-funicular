// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface ILender {
  struct NFT {
    address nftContract;
    uint256 tokenId;
    bool listed;
  }

  struct Offer {
    address nftContract;
    uint256 tokenId;
    address lender;
    address borrower;
    uint256 interestRate; // Should be in basis points. 1% = 100
    uint256 duration; // In seconds
    uint256 amount; // In FHD
    uint256 startTime; // Unix timestamp in seconds
    uint256 endTime; // Unix timestamp in seconds
    bool active;
  }

  function createOffer(
    address _nftContract,
    uint256 _tokenId,
    uint256 _interestRate,
    uint256 _duration,
    uint256 _amount
  ) external returns (uint256);

  function listNft(address _nftContract, uint256 _tokenId) external;

  function getListedNfts() external view returns (NFT[] memory);

  function acceptOffer(uint256 _offerId) external;

  function repayLoan(uint256 _offerId) external;

  function claimNFT(uint256 _offerId) external;

  function cancelOffer(uint256 _offerId) external;

  function getOffer(uint256 _offerId) external view returns (Offer memory);

  function getOffersByNft(
    address _nftContract,
    uint256 _tokenId
  ) external view returns (Offer[] memory);

  function getInterest(
    uint256 _offerId,
    uint256 startTime,
    uint256 endTime
  ) external view returns (uint256);
}
