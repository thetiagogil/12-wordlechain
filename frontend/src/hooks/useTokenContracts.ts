/* import { useWriteContract } from "wagmi";
import { WordleTokenABI } from "../abis/WordleToken.abi";
import { WORDLE_GAME_ADDRESS, WORDLE_TOKEN_ADDRESS } from "../config/constants";
import { viemClient } from "../config/test-client";

export const useWriteTokenContract = () => {
  const { writeContract, isPending, data } = useWriteContract();

  const approveTokens = async () => {
    writeContract({
      address: WORDLE_TOKEN_ADDRESS,
      abi: WordleTokenABI,
      functionName: "approve",
      args: [WORDLE_GAME_ADDRESS, 10 * 10 ** 18]
    });
  };

  return { approveTokens, isPending, data };
};

export const useReadTokenAllowance = async (userAddress: `0x${string}` | undefined) => {
  const allowance = await viemClient.readContract({
    address: WORDLE_TOKEN_ADDRESS,
    abi: WordleTokenABI,
    functionName: "allowance",
    args: [userAddress, WORDLE_GAME_ADDRESS]
  });

  return allowance;
};
 */
