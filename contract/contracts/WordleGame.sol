// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WordleToken.sol";

contract WordleGame {
	address public token;
	address public admin;
	string private word;
	uint256 public constant GUESS_FEE = 1 ether;
	uint256 public constant MAX_ATTEMPTS = 5;
	uint256 public wordId; // ID for the current word (if a new word is set, this ID is incremented)

	mapping(uint256 => mapping(address => string[])) private playerGuesses;
	mapping(uint256 => mapping(address => bool))
		private hasPlayerGuessedCorrectly;

	// Constructor to initialize the contract with the token address
	constructor(address _token) {
		token = _token;
		admin = msg.sender;
		wordId = 1;
	}

	// Modifier to restrict certain actions to the admin
	modifier onlyAdmin() {
		require(msg.sender == admin, "Only the admin can perform this action");
		_;
	}

	// Function to set the word (admin only)
	function setWord(string memory _word) external onlyAdmin {
		require(bytes(_word).length == 5, "Word must be 5 letters long");
		word = _word;
		wordId = wordId + 1;
	}

	// Function for players to make a guess
	function makeGuess(string memory playerGuess) public {
		require(bytes(playerGuess).length == 5, "Guess must be 5 letters long");
		require(
			IERC20(token).balanceOf(msg.sender) >= GUESS_FEE,
			"Player does not have enough tokens"
		);
		require(
			!hasPlayerGuessedCorrectly[wordId][msg.sender],
			"Player has already guessed correctly"
		);
		require(
			playerGuesses[wordId][msg.sender].length < MAX_ATTEMPTS,
			"Player has exceeded the maximum number of guesses"
		);

		// Deduct the guess fee from the player's balance
		IERC20(token).transferFrom(msg.sender, address(this), GUESS_FEE);

		// Update the player's guesses with new guess
		playerGuesses[wordId][msg.sender].push(playerGuess);

		// Check if the guess matches the word
		bool isCorrect = keccak256(abi.encodePacked(playerGuess)) ==
			keccak256(abi.encodePacked(word));
		if (isCorrect) {
			hasPlayerGuessedCorrectly[wordId][msg.sender] = true;
		}
	}

	// Function to calculate letter statuses for a specific guess
	function getLetterStatuses(
		address player,
		uint256 guessIndex
	) public view returns (uint8[5] memory) {
		require(
			guessIndex < playerGuesses[wordId][player].length,
			"Invalid guess index!"
		);

		string memory playerGuess = playerGuesses[wordId][player][guessIndex];
		bytes memory guessBytes = bytes(playerGuess);
		bytes memory wordBytes = bytes(word);

		uint8[5] memory letterStatuses; // Array to store letter statuses
		bool[5] memory matchedWordBytes; // Tracks whether a letter in the word has been matched

		// First check: Check for correct letters in the correct positions
		for (uint8 i = 0; i < 5; i++) {
			// If correct letter and position, return 2
			if (guessBytes[i] == wordBytes[i]) {
				letterStatuses[i] = 2;
				matchedWordBytes[i] = true;
			} else {
				// Second check: Check for correct letters in wrong positions
				for (uint8 j = 0; j < 5; j++) {
					// If correct letter but wrong position, return 1
					if (!matchedWordBytes[j] && guessBytes[i] == wordBytes[j]) {
						letterStatuses[i] = 1;
						matchedWordBytes[j] = true;
						break;
					}
				}
			}
		}

		return letterStatuses;
	}

	// Function to get all the player's guesses for the current word
	function getPlayerGuesses(
		address player
	) public view returns (string[] memory) {
		return playerGuesses[wordId][player];
	}

	// Function to check if a player has guessed the current word correctly
	function getHasPlayerGuessedCorrectly(
		address player
	) public view returns (bool) {
		return hasPlayerGuessedCorrectly[wordId][player];
	}
}
