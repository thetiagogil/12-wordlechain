import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { GameAdmin } from "../components/layout/game-admin";
import { GameApprove } from "../components/layout/game-approve";
import { GameGuess } from "../components/layout/game-guess";
import { GameKeyboard } from "../components/layout/game-keyboard";
import { MainContainer } from "../components/shared/container";
import { MintButton } from "../components/shared/mint-button";
import { useApproveTokens } from "../hooks/useApproveTokens";
import { useMintTokens } from "../hooks/useMintTokens";
import { usePlayGame } from "../hooks/usePlayGame";
import { useSetWord } from "../hooks/useSetWord";

export const GamePage = () => {
  const [guess, setGuess] = useState<string>("");

  const { address: playerAddress, isConnected } = useAccount();
  const { handleMintTokens, balance, hasBalance, isLoading: isMinting, refetchBalance } = useMintTokens();
  const {
    handleApproveTokens,
    refetchAllowance,
    allowance,
    hasAllowance,
    isLoading: isLoadingToken
  } = useApproveTokens();
  const {
    handleSubmitGuess,
    refetchPlayerGuesses,
    refetchHasPlayerGuessedCorrectly,
    refetchLetterStatusesData,
    playerGuessesArray,
    letterStatusesArray,
    hasPlayerGuessedCorrectly,
    hasPlayerReachedGuessLimit,
    isLoadingWordSubmit: isLoadingWordSubmit,
    isLoadingWordStatus: isLoadingWordStatus
  } = usePlayGame({ guess, setGuess, refetchBalance, refetchAllowance });
  const {
    handleSetWord,
    adminAddress,
    isLoading: isLoadingNewWord
  } = useSetWord({ refetchPlayerGuesses, refetchHasPlayerGuessedCorrectly, refetchLetterStatusesData });
  const isDisabled = !isConnected || isLoadingNewWord || isLoadingToken || isLoadingWordSubmit || isLoadingWordStatus;

  return (
    <MainContainer>
      <ConnectButton />
      <GameGuess guess={guess} playerGuessesArray={playerGuessesArray} letterStatusesArray={letterStatusesArray} />
      {playerAddress === adminAddress && (
        <GameAdmin handleSetWord={handleSetWord} isLoadingNewWord={isLoadingNewWord} isDisabled={isDisabled} />
      )}
      <MintButton
        handleMintTokens={handleMintTokens}
        balance={balance}
        hasBalance={hasBalance}
        isMinting={isMinting}
        isDisabled={isDisabled}
      />
      <GameApprove
        handleApproveTokens={handleApproveTokens}
        allowance={allowance}
        hasAllowance={hasAllowance}
        isLoadingToken={isLoadingToken}
        isDisabled={isDisabled || !hasBalance}
      />
      <GameKeyboard
        guess={guess}
        setGuess={setGuess}
        handleSubmitGuess={handleSubmitGuess}
        allowance={allowance}
        hasPlayerGuessedCorrectly={hasPlayerGuessedCorrectly}
        hasPlayerReachedGuessLimit={hasPlayerReachedGuessLimit}
        playerGuessesArray={playerGuessesArray}
        letterStatusesArray={letterStatusesArray}
        isLoadingWordSubmit={isLoadingWordSubmit}
        isDisabled={isDisabled || !hasBalance || !hasAllowance}
      />
    </MainContainer>
  );
};
