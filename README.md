# Wordle 3.0 - Blockchain Edition

Wordle 3.0 is a blockchain-based version of the classic Wordle game, built for Web3. Players use a custom ERC20 token to make guesses, combining blockchain technology with an interactive web interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Project Setup Instructions](#project-setup-instructions)
- [How It Works](#how-it-works)
- [Potential Features](#potential-features)

## Features

- **Blockchain Integration**: Powered by Wagmi and RainbowKit, the game ensures wallet connections and Ethereum interactions.
- **Tokenized Gameplay**: Players use a custom ERC20 token, `WordleToken (WTK)`, to participate in the game.
- **Secure Transactions**: All token transactions, including minting, approving tokens and making guesses, are securely handled using OpenZeppelin standards.
- **Dynamic Letter Feedback**: Players receive feedback for each guess after making a transaction, highlighting correct, misplaced and incorrect letters.
- **Admin Updates Words**: Admins can set new words, resetting the game state for all players.
- **Responsive Frontend Design**: Built with Joy UI and optimized for consistent styling across devices.

## Tech Stack

### Smart Contracts

- **Solidity**: Used to write the smart contracts for game logic and token management.
- **OpenZeppelin**: Provides secure and reusable libraries for implementing ERC20 standards.
- **Foundry**: Used for testing and deploying smart contracts.

### Frontend

- **React + Vite**: React is used to build the interface, and Vite ensures fast development and optimized builds.
- **TypeScript**: Adds type safety and improves code maintainability.
- **Wagmi & RainbowKit**: Simplifies wallet connections and blockchain interactions.
- **Joy UI**: Provides a responsive and modern component library for styling.
- **Framer Motion**: Adds animations small animations.
- **React Toastify**: Displays quick notifications for game events and contract interactions.

### Script Management

- **Node.js**: Automates contract deployments and manages server processes.
- **dotenv**: Stores environment variables securely for configuration.
- **Anvil & Sepolia**: Blockchain networks for local development (Anvil) and public testnet deployment (Sepolia).

## Project Structure

### Folder Structure

```
Wordle3.0/
├── contract/               # Solidity smart contracts and tests
│   ├── contracts/          # Contract source files
│   ├── script/             # Deployment scripts
│   ├── test/               # Contract tests
│   ├── .env                # Contract environment variables
├── frontend/               # React frontend
│   ├── public/             # Public assets
│   ├── src/                # Frontend source code
├── scripts/                # Automation scripts for development and deployment
├── .env                    # Root environment variables
├── package.json            # Root dependencies and scripts
└── README.md               # Documentation
```

### Main Contract Files

- `WordleToken.sol`: ERC20 token used in the game for making guesses.
- `WordleGame.sol`: Manages game logic, including guesses and feedback.

### Main Frontend Files

- `HomePage`: Manages token minting and wallet connection.
- `GamePage`: Handles the main gameplay logic.
- `GameAdmin`: Allows the admin to set new words and reset the game state.
- `GameApprove`: Handles token approval required for gameplay.
- `GameGuess`: Displays the grid of guesses and their feedback statuses.
- `GameKeyboard`: Displays the virtual keyboard for entering guesses.

## Project Setup Instructions

### Prerequisites

- **Node.js** (v22.13.0)
- **Foundry** (for contract development)
- **MetaMask** or any compatible Ethereum wallet

### Environment Variables

Create `.env` files in the root and `/contract` directories with the following variables (you can also refer to the `.env.example` files provided in these directories):

_Root Environment Variables:_

```env
RPC_URL="rpc_url"
DEPLOYER_KEY="deployer_key"
VITE_PUBLIC_PROJECT_ID="vite_public_project_id"
VITE_WORDLE_TOKEN_ANVIL_ADDRESS="vite_wordle_token_anvil_address"
VITE_WORDLE_GAME_ANVIL_ADDRESS="vite_wordle_game_anvil_address"
VITE_WORDLE_TOKEN_SEPOLIA_ADDRESS="vite_wordle_token_sepolia_address"
VITE_WORDLE_GAME_SEPOLIA_ADDRESS="vite_wordle_game_sepolia_address"
```

_Contract Environment Variables:_

```env
DEPLOYER_KEY="deployer_key"
```

### Installation

1. Clone the repository:
   - `git clone https://github.com/your-repo/wordle3.0.git`
   - `cd wordle3.0`
2. Install dependencies - run this custom build script from the root directory to install all dependencies, build the contracts and prepare the frontend:
   - `npm run build`
3. Start the development server - run this custom script from the root to start Anvil, deploy contracts and launch the frontend:
   - `npm run dev`

### Testing

1. Smart Contracts - run Foundry tests:

   - `cd contract`
   - `forge test`

2. Frontend - currently, no frontend tests are implemented.

## How It Works

1. **Mint Tokens**:
   - Players can mint the game's token for free to play the game. Each mint provides `10 WTK`, up to a maximum of `100 WTK` per player (currently).
2. **Approve Tokens**:
   - Players must approve the game contract to spend their tokens. Each approval allows the game to use up to `5 WTK`.
3. **Make Guesses**:
   - Each guess deducts `1 WTK` from the player’s balance.
   - Players receive feedback for their guesses:
     - **Green**: Correct letter and position.
     - **Yellow**: Correct letter, wrong position.
     - **Gray**: Incorrect letter.
4. **Set Word**:
   - Only admins can set a new word for the game, which resets the game state for all players.

## Potential Features

- **On-Chain Profiles**: Implement profiles for players that are stored and managed directly on the blockchain.
- **Analytics**: Provide players with detailed stats and insights on their current and previous plays.
- **Rewards**: Introduce token rewards for correct guesses, scaled by the number of attempts.
- **Leaderboard**: Track and display top players based on performance.
- **Multi-Network Support**: Expand compatibility to additional networks.

## Contact

- **GitHub**: [Tiago Gil](https://github.com/thetiagogil)
