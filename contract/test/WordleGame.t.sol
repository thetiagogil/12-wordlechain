// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/WordleGame.sol";
import "../contracts/MyERC20Token.sol";

contract WordleGameTest is Test {
    WordleGame game;
    MyERC20Token token;
    address player = address(0x123);

    function setUp() public {
        // Deploy the token contract with an initial supply
        token = new MyERC20Token(1000 * 10 ** 18);

        // Deploy the WordleGame contract with the token and initial word
        game = new WordleGame(token, "APPLE");

        // Transfer tokens to the player
        token.transfer(player, 100 * 10 ** 18);

        // Transfer tokens to the game contract for rewards
        token.transfer(address(game), 500 * 10 ** 18);
    }

    function testCorrectGuess() public {
        // Start acting as the player
        vm.startPrank(player);

        // Approve the game contract to spend player's tokens
        token.approve(address(game), 1 * 10 ** 18);

        // Make a correct guess
        game.guess("APPLE");

        // Check the player's token balance after the guess
        uint256 balance = token.balanceOf(player);

        // Player starts with 100 tokens, spends 1 token, receives 5 tokens as reward
        // Expected balance: 100 - 1 + 5 = 104 tokens
        assertEq(balance, 104 * 10 ** 18, "Player should have 104 tokens after correct guess");

        vm.stopPrank();
    }

    function testIncorrectGuess() public {
        // Start acting as the player
        vm.startPrank(player);

        // Approve the game contract to spend player's tokens
        token.approve(address(game), 1 * 10 ** 18);

        // Make an incorrect guess (5-letter word that is not "APPLE")
        game.guess("GRAPE");

        // Check the player's token balance after the guess
        uint256 balance = token.balanceOf(player);

        // Player starts with 100 tokens, spends 1 token, no reward
        // Expected balance: 100 - 1 = 99 tokens
        assertEq(balance, 99 * 10 ** 18, "Player should have 99 tokens after incorrect guess");

        vm.stopPrank();
    }
}
