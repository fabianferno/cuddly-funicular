// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// for Remix
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract FXD is ERC20("Fathom Dollar", "FXD") {
  address private _owner;

  constructor() {
    _owner = msg.sender;
    _mint(_owner, 10000000000000000000000);
  }

  function mint(address to) public {
    require(msg.sender == _owner);
    _mint(to, 1000);
  }
}
