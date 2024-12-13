import { Box, Button, Grid, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WordleGameABI } from "../abis/WordleGame.abi";
import { WordleTokenABI } from "../abis/WordleToken.abi";
import { WORDLE_GAME_ADDRESS, WORDLE_TOKEN_ADDRESS } from "../config/constants";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const GameBoard = () => {
  // States
  const [word, setWord] = useState<string>("");
  const [approveHash, setApproveHash] = useState<`0x${string}` | undefined>(undefined);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  // Constants
  const guess = word.toUpperCase();

  // Hooks
  const { address: userAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // ERC20 Contract
  const { data: approveReceipt } = useWaitForTransactionReceipt({
    hash: approveHash
  });
  const approveData = useReadContract({
    abi: WordleTokenABI,
    address: WORDLE_TOKEN_ADDRESS,
    functionName: "allowance",
    args: [userAddress, WORDLE_GAME_ADDRESS]
  });

  // Game Contract
  const { data: txReceipt } = useWaitForTransactionReceipt({
    hash: txHash
  });
  const txData = useReadContract({
    abi: WordleGameABI,
    address: WORDLE_GAME_ADDRESS,
    functionName: "guesses",
    args: [guess]
  });

  // Game Logic
  const handleLetterClick = (letter: string) => {
    if (word.length < 5) setWord(prev => prev + letter);
  };

  const handleDelete = () => {
    if (word.length > 0) setWord(prev => prev.slice(0, -1));
  };

  // Submit Approve Button Handler
  const handleApprove = async () => {
    try {
      const response = await writeContractAsync({
        address: WORDLE_TOKEN_ADDRESS,
        abi: WordleTokenABI,
        functionName: "approve",
        args: [WORDLE_GAME_ADDRESS, 10 * 10 ** 18]
      });

      console.log("Approve hash:", response);
      setApproveHash(response);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Submit Guess Button Handler
  const handleSubmitGuess = async () => {
    try {
      const response = await writeContractAsync({
        address: WORDLE_GAME_ADDRESS,
        abi: WordleGameABI,
        functionName: "guess",
        args: [guess]
      });

      console.log("Tx hash:", response);
      setTxHash(response);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Use Effects
  useEffect(() => {
    if (approveReceipt) {
      console.log(approveData);
    }
  }, [approveReceipt]);

  useEffect(() => {
    if (txReceipt) {
      console.log(txData);
    }
  }, [txReceipt]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Submit Approve Tokens Button */}
      <Button size="lg" fullWidth onClick={handleApprove} color="success">
        Approve Tokens
      </Button>

      {/* Word */}
      <Grid container sx={{ justifyContent: "space-between" }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid
            component={Stack}
            key={index}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid",
              height: { xs: 65, sm: 75 },
              width: { xs: 65, sm: 75 },
              fontSize: 32,
              fontWeight: "bold"
            }}
          >
            {guess[index]}
          </Grid>
        ))}
      </Grid>

      {/* Letters + Delete Button + Submit Guess Button */}
      <Grid container spacing={0.5} columns={6} sx={{ justifyContent: "center" }}>
        {ALPHABET.map(letter => (
          <Grid xs={1} key={letter}>
            <Button size="lg" fullWidth onClick={() => handleLetterClick(letter)} color="neutral">
              {letter}
            </Button>
          </Grid>
        ))}
        <Grid xs={2}>
          <Button size="lg" fullWidth onClick={handleDelete} color="neutral">
            Delete
          </Button>
        </Grid>
        <Grid xs={2}>
          <Button size="lg" fullWidth onClick={handleSubmitGuess} disabled={guess.length < 5} color="success">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
