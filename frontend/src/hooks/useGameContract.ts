import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useReadContract, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WordleGameABI } from "../abis/WordleGame.abi";
import { WORDLE_GAME_ADDRESS } from "../config/constants";
import { useTokenContract } from "./useTokenContract";

type UseGameContractProps = {
  guess: string;
};

export const useGameContract = ({ guess }: UseGameContractProps) => {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address: playerAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { refetchAllowance } = useTokenContract();

  // Handle check admin address
  const { data: adminAddress } = useReadContract({
    abi: WordleGameABI,
    address: WORDLE_GAME_ADDRESS,
    functionName: "admin"
  });

  // Handle check player guesses
  const {
    data: getPlayerGuesses,
    refetch: refetchPlayerGuesses,
    isLoading: isLoadingPlayerGuesses
  } = useReadContract({
    abi: WordleGameABI,
    address: WORDLE_GAME_ADDRESS,
    functionName: "getPlayerGuesses",
    args: [playerAddress as `0x${string}`]
  }) as { data: string[]; refetch: () => void; isLoading: boolean };

  const getPlayerGuessesArray: string[] = Array.isArray(getPlayerGuesses) ? getPlayerGuesses : [];

  // Handle check if player has guessed correctly
  const {
    data: getHasPlayerGuessedCorrectly,
    refetch: refetchHasPlayerGuessedCorrectly,
    isLoading: isLoadingHasPlayerGuessedCorrectly
  } = useReadContract({
    abi: WordleGameABI,
    address: WORDLE_GAME_ADDRESS,
    functionName: "getHasPlayerGuessedCorrectly",
    args: [playerAddress as `0x${string}`]
  }) as { data: boolean; refetch: () => void; isLoading: boolean };

  // Handle check letter statuses
  const getLetterStatusesMap =
    getPlayerGuessesArray.length > 0
      ? Array.from({ length: getPlayerGuessesArray.length }).map(
          (_, index) =>
            ({
              abi: WordleGameABI,
              address: WORDLE_GAME_ADDRESS,
              functionName: "getLetterStatuses",
              args: [playerAddress as `0x${string}`, BigInt(index)]
            }) as const
        )
      : [];

  const {
    data: getLetterStatusesData,
    refetch: refetchLetterStatusesData,
    isLoading: isLoadingLetterStatusesData
  } = useReadContracts({
    contracts: getLetterStatusesMap
  });

  const getLetterStatusesArray =
    getLetterStatusesData?.map(item => (item.result ? { data: Array.from(item.result) } : { data: [] })) || [];

  // Handle set new word by admin
  const handleSetWord = async (newWord: string) => {
    if (newWord.length !== 5) {
      toast.error("Word must be 5 letters!", { closeOnClick: true });
      return;
    }

    setIsLoading(true);
    try {
      const response = await writeContractAsync({
        address: WORDLE_GAME_ADDRESS,
        abi: WordleGameABI,
        functionName: "setWord",
        args: [newWord]
      });
      setHash(response);
      toast.success("Word set successfully!", { closeOnClick: true });
    } catch (err: any) {
      toast.error("Failed to set word. Please try again.", { closeOnClick: true });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submit guess
  const handleSubmitGuess = async (allowance: number, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      switch (true) {
        case allowance <= 0:
          toast.error("You need allowance to play the game.", { closeOnClick: true });
          break;
        case getHasPlayerGuessedCorrectly:
          toast.error("You have already guessed correctly!", { closeOnClick: true });
          break;
        case Array.isArray(getPlayerGuesses) && getPlayerGuesses.length >= 5:
          toast.error("You already exceeded the limit play tries for today!", { closeOnClick: true });
          break;
        default:
          const response = await writeContractAsync({
            address: WORDLE_GAME_ADDRESS,
            abi: WordleGameABI,
            functionName: "makeGuess",
            args: [guess]
          });
          setHash(response);
          if (onSuccess) {
            onSuccess();
          }
      }
    } catch (err: any) {
      toast.error("Failed to submit guess. Please try again.", { closeOnClick: true });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle wait for make guess contract function receipt
  const { isSuccess: hasWaitedForGuess } = useWaitForTransactionReceipt({ hash });

  // Trigger refetch after makeGuess contract function has waited
  useEffect(() => {
    if (hasWaitedForGuess) {
      refetchPlayerGuesses();
      refetchHasPlayerGuessedCorrectly();
      refetchLetterStatusesData();
      refetchAllowance();
      toast.success("Guess submitted successfully!", { closeOnClick: true });
    }
  }, [hasWaitedForGuess, refetchPlayerGuesses, refetchHasPlayerGuessedCorrectly, refetchLetterStatusesData]);

  return {
    handleSetWord,
    handleSubmitGuess,
    adminAddress,
    getPlayerGuessesArray,
    getLetterStatusesArray,
    getHasPlayerGuessedCorrectly,
    hasWaitedForGuess,
    isLoading: isLoading || isLoadingPlayerGuesses || isLoadingHasPlayerGuessedCorrectly || isLoadingLetterStatusesData
  };
};
