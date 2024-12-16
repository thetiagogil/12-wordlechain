import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WordleTokenABI } from "../abis/WordleToken.abi";
import { WORDLE_GAME_ADDRESS, WORDLE_TOKEN_ADDRESS } from "../config/constants";

export const useTokenContract = () => {
  // States
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);

  // Hooks
  const { address: userAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Handle Approve Tokens Button
  const handleApproveTokens = async () => {
    try {
      const response = await writeContractAsync({
        address: WORDLE_TOKEN_ADDRESS,
        abi: WordleTokenABI,
        functionName: "approve",
        args: [WORDLE_GAME_ADDRESS, 10 * 10 ** 18]
      });
      setHash(response);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Handle Wait For Transaction Receipt
  const { data: hasWaitedForAllowance } = useWaitForTransactionReceipt({
    hash: hash
  });

  // Get Allowance
  const allowanceObj = useReadContract({
    abi: WordleTokenABI,
    address: WORDLE_TOKEN_ADDRESS,
    functionName: "allowance",
    args: [userAddress, WORDLE_GAME_ADDRESS]
  });

  // Handle Check Allowance Button
  const handleCheckAllowance = async () => {
    try {
      toast.info(`Your allowance is: ${allowanceObj.data}.`, { closeOnClick: true });
    } catch (err: any) {
      console.error(err);
    }
  };

  return {
    handleApproveTokens,
    handleCheckAllowance,
    hasWaitedForAllowance,
    allowanceObj
  };
};
