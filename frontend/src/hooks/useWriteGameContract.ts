import { useWriteContract } from "wagmi";
import { WordleGameABI } from "../abis/WordleGame.abi";
import { WORDLE_GAME_ADDRESS } from "../config/constants";

export const useWriteGameContract = () => {
  const { writeContract, isPending, data: contractHash } = useWriteContract();

  const makeGuess = async (guess: string) => {
    writeContract({
      address: WORDLE_GAME_ADDRESS,
      abi: WordleGameABI,
      functionName: "guess",
      args: [guess]
    });
  };

  return { makeGuess, isPending, contractHash };
};
