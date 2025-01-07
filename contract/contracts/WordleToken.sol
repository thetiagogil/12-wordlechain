// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract WordleToken is ERC20 {
	// Constructor to initialize the token with a name, symbol and initial supply
	constructor(uint256 initialSupply) ERC20("WordleToken", "WTK") {
		// Mint the initial supply of tokens to the deployer's address (msg.sender)
		_mint(msg.sender, initialSupply);
	}
}
