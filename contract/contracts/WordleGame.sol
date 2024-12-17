// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WordleToken.sol";

contract WordleGame {
    address public token;
    string private constant FIXED_WORD = "APPLE";
    uint256 public constant GUESS_FEE = 10 * 10 ** 18;

    // Nested mapping to store all guesses per user
    mapping(address => string[]) private userGuesses;

    // Mapping to track if a user has guessed the correct word
    mapping(address => bool) private hasGuessedCorrectly;

    constructor(address _token) {
        token = _token;
    }

    // Function to make a guess
    function guess(string memory userGuess) public {
        require(bytes(userGuess).length == 5, "Guess must be 5 letters long");
        require(IERC20(token).balanceOf(msg.sender) >= GUESS_FEE, "Insufficient tokens");
        require(!hasGuessedCorrectly[msg.sender], "You have already guessed correctly!");
        
        IERC20(token).transferFrom(msg.sender, address(this), GUESS_FEE);

        // Check if the guess is correct
        bool isCorrect = keccak256(abi.encodePacked(userGuess)) == keccak256(abi.encodePacked(FIXED_WORD));

        // Update the user's guesses
        userGuesses[msg.sender].push(userGuess);

        // Update the user's status if the guess is correct
        if (isCorrect) {
            hasGuessedCorrectly[msg.sender] = true;
        }
    }

    // Get all guesses made by a user
    function getUserGuesses(address user) public view returns (string[] memory) {
        return userGuesses[user];
    }

    // Check if a user has guessed correctly
    function hasUserGuessedCorrectly(address user) public view returns (bool) {
        return hasGuessedCorrectly[user];
    }
}
