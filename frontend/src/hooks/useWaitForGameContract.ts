import { useWaitForTransactionReceipt } from "wagmi";

export const useWaitForGameContract = (hash: `0x${string}` | undefined) => {
  const { isSuccess: hasWaited } = useWaitForTransactionReceipt({
    hash: hash
  });

  return { hasWaited };
};
