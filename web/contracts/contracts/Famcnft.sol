// This smart contract allows lenders to lend money to borrowers against their NFTs.
//
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// for Remix
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract Famcnft is ERC721("FastApeMotoClub", "FAMC") {
  uint256 private _tokenId;
  string private _name;
  string private _symbol;
  address private _owner;

  constructor() {
    _owner = msg.sender;
    // mint five tokens
    for (uint i = 0; i < 5; i++) {
      _safeMint(msg.sender, _tokenId++);
    }
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return
      "https://api.decentraland.org/v2/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/";
  }

  function mint(address to) public {
    require(msg.sender == _owner);
    _safeMint(to, _tokenId++);
  }
}
