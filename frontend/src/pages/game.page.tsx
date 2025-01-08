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
  const [guess, setGuess] = useState<string>("");

  const { address: playerAddress } = useAccount();
  const { handleApproveTokens, allowance, isLoading: isLoadingToken } = useTokenContract();
  const {
    handleSetWord,
    handleSubmitGuess,
    adminAddress,
    getPlayerGuessesArray,
    getLetterStatusesArray,
    getHasPlayerGuessedCorrectly,
    isLoading: isLoadingGame
  } = useGameContract({ guess });

  return (
    <MainContainer>
      <ConnectButton />
      <GameGuess
        guess={guess}
        getPlayerGuessesArray={getPlayerGuessesArray}
        getLetterStatusesArray={getLetterStatusesArray}
      />
      {playerAddress === adminAddress && (
        <GameAdmin handleSetWord={handleSetWord} isLoading={isLoadingToken || isLoadingGame} />
      )}
      <GameApprove
        handleApproveTokens={handleApproveTokens}
        allowance={allowance}
        isLoadingToken={isLoadingToken}
        isLoadingGame={isLoadingGame}
      />
      <GameKeyboard
        guess={guess}
        setGuess={setGuess}
        handleSubmitGuess={handleSubmitGuess}
        allowance={allowance}
        getHasPlayerGuessedCorrectly={getHasPlayerGuessedCorrectly}
        isLoadingGame={isLoadingGame}
      />
    </MainContainer>
  );
};
