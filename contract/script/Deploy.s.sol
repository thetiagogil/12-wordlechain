// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";

import "../contracts/WordleToken.sol";
import "../contracts/WordleGame.sol";

contract Deploy is Script {
	function run() external {
		// Load environment variables
		uint256 deployerPrivateKey = vm.envUint("DEPLOYER_KEY");
		address admin = vm.envAddress("ADMIN_KEY");
		address player = vm.envAddress("PLAYER_KEY");

		// Start broadcasting transactions
		vm.startBroadcast(deployerPrivateKey);

		// Deploy the WordleToken contract
		WordleToken token = new WordleToken(1000 ether);
		console.log("Wordle Token deployed at:", address(token));

		// Deploy the WordleGame contract
		WordleGame game = new WordleGame(address(token));
		console.log("Wordle Game deployed at:", address(game));

		// Set an initial word
		string memory firstWord = "MANGO";
		game.setWord(firstWord);
		console.log("Initial word set to:", firstWord);

		// Transfer tokens to the admin and player addresses (for testing purposes)
		token.transfer(admin, 10 ether);
		console.log("10 tokens transferred to admin address:", admin);

		token.transfer(player, 10 ether);
		console.log("10 tokens transferred to player address:", player);

		// Stop broadcasting transactions
		vm.stopBroadcast();
	}
}
