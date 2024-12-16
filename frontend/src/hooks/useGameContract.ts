import { useState } from "react";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WordleGameABI } from "../abis/WordleGame.abi";
import { WORDLE_GAME_ADDRESS } from "../config/constants";

type UseGameContractProps = {
  guess: string;
};

export const useGameContract = ({ guess }: UseGameContractProps) => {
  // States
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);

  // Hooks
  const { writeContractAsync } = useWriteContract();

  // Handle Submit Guess Button
  const handleSubmitGuess = async () => {
    try {
      const response = await writeContractAsync({
        address: WORDLE_GAME_ADDRESS,
        abi: WordleGameABI,
        functionName: "guess",
        args: [guess]
      });
      setHash(response);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Handle Wait For Transaction Receipt
  const { data: hasWaitedForGuess } = useWaitForTransactionReceipt({
    hash: hash
  });

  // Get Guess Result
  const guessObj = useReadContract({
    abi: WordleGameABI,
    address: WORDLE_GAME_ADDRESS,
    functionName: "guesses",
    args: [guess]
  });

  return {
    handleSubmitGuess,
    hasWaitedForGuess,
    guessObj
  };
};
