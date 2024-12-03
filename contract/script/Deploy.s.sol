// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../contracts/MyERC20Token.sol";
import "../contracts/WordleGame.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        MyERC20Token token = new MyERC20Token(1000 * 10 ** 18);
        console.log("MyERC20Token deployed at:", address(token));

        WordleGame game = new WordleGame(token, "APPLE");
        console.log("WordleGame deployed at:", address(game));

        vm.stopBroadcast();
    }
}
