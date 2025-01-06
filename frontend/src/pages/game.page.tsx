import { Box } from "@mui/joy";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { GameAdmin } from "../components/layout/game-admin";
import { GameApprove } from "../components/layout/game-approve";
import { GameGuess } from "../components/layout/game-guess";
import { GameKeyboard } from "../components/layout/game-keyboard";
import { MainContainer } from "../components/shared/container";
import { useGameContract } from "../hooks/useGameContract";
import { useTokenContract } from "../hooks/useTokenContract";

export const GamePage = () => {
  // States
  const [guess, setGuess] = useState<string>("");

  // Hooks
  const { address: userAddress } = useAccount();
  const { handleApproveTokens, handleCheckAllowance, allowance, isLoading: isLoadingToken } = useTokenContract();
  const {
    handleSetWord,
    handleSubmitGuess,
    adminAddress,
    getUserGuessesArray,
    getLetterStatusesArray,
    getHasUserGuessedCorrectly,
    isLoading: isLoadingGame
  } = useGameContract({ guess });

  return (
    <MainContainer>
      <ConnectButton />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <GameGuess
          guess={guess}
          getUserGuessesArray={getUserGuessesArray}
          getLetterStatusesArray={getLetterStatusesArray}
        />
        {userAddress === adminAddress && (
          <GameAdmin handleSetWord={handleSetWord} isLoading={isLoadingToken || isLoadingGame} />
        )}
        <GameApprove
          handleApproveTokens={handleApproveTokens}
          handleCheckAllowance={handleCheckAllowance}
          allowance={allowance}
          isLoadingToken={isLoadingToken}
          isLoadingGame={isLoadingGame}
        />
        <GameKeyboard
          guess={guess}
          setGuess={setGuess}
          handleSubmitGuess={handleSubmitGuess}
          allowance={allowance}
          getHasUserGuessedCorrectly={getHasUserGuessedCorrectly}
          isLoadingGame={isLoadingGame}
        />
      </Box>
    </MainContainer>
  );
};
