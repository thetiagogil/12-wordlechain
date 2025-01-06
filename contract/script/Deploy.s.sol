// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../contracts/WordleToken.sol";
import "../contracts/WordleGame.sol";

contract Deploy is Script {
	function run() external {
		// Load environment variables
		uint256 deployerPrivateKey = vm.envUint("ADMIN_PRIVATE_KEY");
		address admin = vm.envAddress("ADMIN_PUBLIC_KEY");
		address player = vm.envAddress("PLAYER_PUBLIC_KEY");

		// Start broadcasting transactions
		vm.startBroadcast(deployerPrivateKey);

		// Deploy the WordleToken contract
		WordleToken token = new WordleToken(1000 ether);
		console.log("Wordle Token deployed at:", address(token));

		// Deploy the WordleGame contract
		WordleGame game = new WordleGame(address(token));
		console.log("Wordle Game deployed at:", address(game));

		// Transfer tokens to the user's address
		token.transfer(admin, 10 ether);
		console.log("100 tokens transferred to user address:", admin);
		token.transfer(player, 10 ether);
		console.log("100 tokens transferred to user address:", player);

		vm.stopBroadcast();
	}
}
