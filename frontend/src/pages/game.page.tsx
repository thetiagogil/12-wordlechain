import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { GameAdmin } from "../components/layout/game-admin";
import { GameApprove } from "../components/layout/game-approve";
import { GameGuess } from "../components/layout/game-guess";
import { GameKeyboard } from "../components/layout/game-keyboard";
import { MainContainer } from "../components/shared/container";
import { useAdminFunction } from "../hooks/useAdminFunction";
import { useGameContract } from "../hooks/useGameContract";
import { useTokenContract } from "../hooks/useTokenContract";

export const GamePage = () => {
  const [guess, setGuess] = useState<string>("");

  const { address: playerAddress } = useAccount();
  const { handleApproveTokens, refetchAllowance, allowance, isLoading: isLoadingToken } = useTokenContract();
  const {
    handleSubmitGuess,
    refetchPlayerGuesses,
    refetchHasPlayerGuessedCorrectly,
    refetchLetterStatusesData,
    playerGuessesArray,
    letterStatusesArray,
    hasPlayerGuessedCorrectly,
    isLoading: isLoadingGame
  } = useGameContract({ guess, refetchAllowance });
  const {
    handleSetWord,
    adminAddress,
    isLoading: isLoadingNewWord
  } = useAdminFunction({ refetchPlayerGuesses, refetchHasPlayerGuessedCorrectly, refetchLetterStatusesData });
  const isDisabled = isLoadingNewWord || isLoadingToken || isLoadingGame;

  return (
    <MainContainer>
      <ConnectButton />
      <GameGuess guess={guess} playerGuessesArray={playerGuessesArray} letterStatusesArray={letterStatusesArray} />
      {playerAddress === adminAddress && (
        <GameAdmin handleSetWord={handleSetWord} isLoadingNewWord={isLoadingNewWord} isDisabled={isDisabled} />
      )}
      <GameApprove
        handleApproveTokens={handleApproveTokens}
        allowance={allowance}
        isLoadingToken={isLoadingToken}
        isDisabled={isDisabled}
      />
      <GameKeyboard
        guess={guess}
        setGuess={setGuess}
        handleSubmitGuess={handleSubmitGuess}
        allowance={allowance}
        hasPlayerGuessedCorrectly={hasPlayerGuessedCorrectly}
        playerGuessesArray={playerGuessesArray}
        letterStatusesArray={letterStatusesArray}
        isLoadingGame={isLoadingGame}
        isDisabled={isDisabled}
      />
    </MainContainer>
  );
};
