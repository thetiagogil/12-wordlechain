import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatEther } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WordleTokenABI } from "../abis/WordleToken.abi";
import { WORDLE_GAME_ADDRESS, WORDLE_TOKEN_ADDRESS } from "../config/constants";

export const useTokenContract = () => {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address: playerAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Handle check allowance
  const { data, refetch: refetchAllowance } = useReadContract({
    abi: WordleTokenABI,
    address: WORDLE_TOKEN_ADDRESS,
    functionName: "allowance",
    args: [playerAddress as `0x${string}`, WORDLE_GAME_ADDRESS]
  });

  const allowance = data ? Number(formatEther(data)) : 0;

  // Handle approve tokens
  const handleApproveTokens = async () => {
    setIsLoading(true);
    try {
      const response = await writeContractAsync({
        address: WORDLE_TOKEN_ADDRESS,
        abi: WordleTokenABI,
        functionName: "approve",
        args: [WORDLE_GAME_ADDRESS, BigInt(5 * 10 ** 18)]
      });
      setHash(response);
    } catch (err: any) {
      toast.error("Failed to approve tokens. Please try again.", { closeOnClick: true });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle wait for approve contract function receipt
  const { isSuccess: hasWaitedForApprove } = useWaitForTransactionReceipt({ hash });

  // Trigger refetch after approve contract function has waited
  useEffect(() => {
    if (hasWaitedForApprove) {
      refetchAllowance();
      toast.success("Tokens approved successfully!", { closeOnClick: true });
    }
  }, [hasWaitedForApprove, refetchAllowance]);

  return {
    handleApproveTokens,
    refetchAllowance,
    allowance,
    isLoading
  };
};
