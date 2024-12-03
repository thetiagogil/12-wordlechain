// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyERC20Token.sol";

contract WordleGame {
    MyERC20Token public token;
    string private wordOfTheDay;
    address public owner;

    event GuessMade(address indexed player, string guess, bool isCorrect);

    constructor(MyERC20Token _token, string memory _wordOfTheDay) {
        token = _token;
        wordOfTheDay = _wordOfTheDay;
        owner = msg.sender;
    }

    function guess(string memory userGuess) public {
        require(bytes(userGuess).length == 5, "Guess must be 5 letters long");
        require(token.transferFrom(msg.sender, address(this), 1 * 10 ** 18), "Token transfer failed"); // 1 WORD per guess

        bool isCorrect = keccak256(abi.encodePacked(userGuess)) == keccak256(abi.encodePacked(wordOfTheDay));
        emit GuessMade(msg.sender, userGuess, isCorrect);

        if (isCorrect) {
            // Reward logic can go here, e.g., transferring tokens back to the user as a reward
            token.transfer(msg.sender, 5 * 10 ** 18); // Example reward for correct guess
        }
    }

    function updateWordOfTheDay(string memory newWord) public {
        require(msg.sender == owner, "Only the owner can update the word");
        wordOfTheDay = newWord;
    }
}
