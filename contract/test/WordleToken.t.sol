// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/WordleToken.sol";

contract WordleTokenTest is Test {
	WordleToken public token;
	address public owner;
	address public spender;

	// Function to setup the tests
	function setUp() public {
		token = new WordleToken(1000 ether);
		owner = address(this);
		spender = address(0x123);

		// Transfer tokens to the spender address for testing purposes
		token.transfer(spender, 10 ether);
	}

	// Test the approve and allowance functionality of the WordleToken contract
	function testApproveAndAllowanceFunctions() public {
		// Simulate transactions from the spender address
		vm.prank(spender);

		// Approve the owner to spend tokens
		bool success = token.approve(owner, 10 ether);

		// Assert that the approval was successful
		assertTrue(success, "Approval should succeed");

		// Check the allowance for the owner (set by the spender)
		uint256 allowance = token.allowance(spender, owner);

		// Assert that the allowance matches the approved amount
		assertEq(allowance, 10 ether, "Allowance should match approved amount");
	}
}
