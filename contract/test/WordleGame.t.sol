// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/WordleToken.sol";
import "../contracts/WordleGame.sol";

contract WordleGameTest is Test {
	WordleToken public token;
	WordleGame public game;

	address public admin;
	address public player;
	address public playerWithoutTokens;

	function setUp() public {
		token = new WordleToken(1000 * 10 ** 18);
		game = new WordleGame(address(token));
		admin = address(this);
		player = address(0x123);
		playerWithoutTokens = address(0x456);

		token.transfer(player, 100 * 10 ** 18);
		vm.prank(player);
		token.approve(address(game), type(uint256).max);

		game.setWord("APPLE");
	}

	function testSetWord() public {
		vm.prank(player);
		vm.expectRevert("Only admin can perform this action");
		game.setWord("PLACE");

		vm.prank(admin);
		game.setWord("PLACE");

		vm.prank(player);
		game.makeGuess("PLACE");
		bool guessedCorrectly = game.getHasUserGuessedCorrectly(player);
		assertTrue(
			guessedCorrectly,
			"Player should guess the newly set word correctly"
		);
	}

	function testMakeGuessWithInsufficientTokens() public {
		vm.prank(playerWithoutTokens);

		uint256 playerBalance = token.balanceOf(playerWithoutTokens);
		assertEq(playerBalance, 0, "Player's balance should be 0");

		vm.prank(playerWithoutTokens);
		vm.expectRevert("Insufficient tokens!");
		game.makeGuess("PLACE");
	}

	function testIncorrectGuess() public {
		vm.prank(player);
		game.makeGuess("PLACE");

		bool guessedCorrectly = game.getHasUserGuessedCorrectly(player);
		assertFalse(guessedCorrectly, "User should not guess correctly");
	}

	function testMakeCorrectGuess() public {
		vm.prank(player);
		game.makeGuess("APPLE");

		bool guessedCorrectly = game.getHasUserGuessedCorrectly(player);
		assertTrue(guessedCorrectly, "User should guess correctly");
	}

	function testMakeGuessAfterMaxAttempts() public {
		for (uint256 i = 0; i < 5; i++) {
			vm.prank(player);
			game.makeGuess("PLACE");
		}

		vm.prank(player);
		vm.expectRevert("You have exceeded the maximum number of guesses!");
		game.makeGuess("PLACE");
	}

	function testMakeGuessWithInvalidLength() public {
		vm.prank(player);
		vm.expectRevert("Guess must be 5 letters long!");
		game.makeGuess("APLE");

		vm.prank(player);
		vm.expectRevert("Guess must be 5 letters long!");
		game.makeGuess("APPPLE");
	}

	function testGetLetterStatuses() public {
		vm.prank(player);
		game.makeGuess("PLACE");

		uint8[5] memory expectedStatuses = [1, 1, 1, 0, 2];
		uint8[5] memory statuses = game.getLetterStatuses(player, 0);

		for (uint256 i = 0; i < 5; i++) {
			assertEq(
				statuses[i],
				expectedStatuses[i],
				"Letter status should match expected"
			);
		}
	}

	function testGetUserGuesses() public {
		vm.prank(player);
		game.makeGuess("PLACE");
		vm.prank(player);
		game.makeGuess("APPLE");

		string[] memory guesses = game.getUserGuesses(player);
		assertEq(guesses.length, 2, "Should return correct number of guesses");
		assertEq(guesses[0], "PLACE", "First guess should match");
		assertEq(guesses[1], "APPLE", "Second guess should match");
	}

	function testGetHasUserGuessedCorrectly() public {
		vm.prank(player);
		game.makeGuess("APPLE");

		bool guessedCorrectly = game.getHasUserGuessedCorrectly(player);
		assertTrue(guessedCorrectly, "User should guess correctly");

		vm.prank(player);
		vm.expectRevert("You have already guessed correctly!");
		game.makeGuess("PLACE");

		guessedCorrectly = game.getHasUserGuessedCorrectly(player);
		assertTrue(guessedCorrectly, "Correct guess status should persist");
	}
}
