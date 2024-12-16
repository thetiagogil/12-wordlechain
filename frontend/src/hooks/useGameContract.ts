import { useState } from "react";
import { toast } from "react-toastify";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WordleGameABI } from "../abis/WordleGame.abi";
import { WORDLE_GAME_ADDRESS } from "../config/constants";

type UseGameContractProps = {
  guess: string;
};

export const useGameContract = ({ guess }: UseGameContractProps) => {
  // States
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hooks
  const { writeContractAsync } = useWriteContract();

  // Handle Submit Guess Button
  const handleSubmitGuess = async () => {
    setIsLoading(true);
    try {
      const response = await writeContractAsync({
        address: WORDLE_GAME_ADDRESS,
        abi: WordleGameABI,
        functionName: "guess",
        args: [guess]
      });
      setHash(response);
    } catch (err: any) {
      toast.error("Failed to submit guess. Please try again.", { closeOnClick: true });
      console.error(err);
    } finally {
      setIsLoading(false);
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
    guessObj,
    isLoading
  };
};
