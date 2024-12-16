import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WordleTokenABI } from "../abis/WordleToken.abi";
import { TOKEN_DECIMALS, WORDLE_GAME_ADDRESS, WORDLE_TOKEN_ADDRESS } from "../config/constants";

export const useTokenContract = () => {
  // States
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hooks
  const { address: userAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Handle Approve Tokens Button
  const handleApproveTokens = async () => {
    setIsLoading(true);
    try {
      const response = await writeContractAsync({
        address: WORDLE_TOKEN_ADDRESS,
        abi: WordleTokenABI,
        functionName: "approve",
        args: [WORDLE_GAME_ADDRESS, 10 * 10 ** 18]
      });
      setHash(response);
      toast.success("Tokens approved successfully!", { closeOnClick: true });
    } catch (err: any) {
      toast.error("Failed to approve tokens. Please try again.", { closeOnClick: true });
    } finally {
      setIsLoading(false);
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

  const allowance = allowanceObj?.data ? Number(allowanceObj.data) / 10 ** TOKEN_DECIMALS : 0;

  // Handle Check Allowance Button
  const handleCheckAllowance = async () => {
    toast.info(`Your allowance is: ${allowance} TKN.`, { closeOnClick: true });
  };

  return {
    handleApproveTokens,
    handleCheckAllowance,
    hasWaitedForAllowance,
    allowance,
    isLoading
  };
};
