import { Box, Button, Grid, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { useReadGameGuess } from "../hooks/useReadGameGuess";
import { useWaitForGameContract } from "../hooks/useWaitForGameContract";
import { useWriteGameContract } from "../hooks/useWriteGameContract";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const GameBoard = () => {
  const [word, setWord] = useState<string>("");
  const guess = word.toUpperCase();

  const { makeGuess, isPending, contractHash } = useWriteGameContract();
  const { hasWaited } = useWaitForGameContract(contractHash);
  const { readGuess } = useReadGameGuess(guess);

  const handleLetterClick = (letter: string) => {
    if (word.length < 5) setWord(prev => prev + letter);
  };

  const handleDelete = () => {
    if (word.length > 0) setWord(prev => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    try {
      makeGuess(guess);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (hasWaited) {
      console.log("Has waited?: " + hasWaited);
      console.log("The guess was: " + guess);
      console.log("Was it correct?: " + readGuess);
    }
  }, [hasWaited]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
            {word[index]}
          </Grid>
        ))}
      </Grid>

      {/* Letters + Buttons */}
      <Grid container spacing={0.5} columns={6} sx={{ justifyContent: "center" }}>
        {ALPHABET.map(letter => (
          <Grid xs={1} key={letter}>
            <Button size="lg" fullWidth onClick={() => handleLetterClick(letter)} color="neutral" disabled={isPending}>
              {letter}
            </Button>
          </Grid>
        ))}
        <Grid xs={2}>
          <Button size="lg" fullWidth onClick={handleDelete} color="neutral" disabled={isPending}>
            Delete
          </Button>
        </Grid>
        <Grid xs={2}>
          <Button
            size="lg"
            fullWidth
            onClick={handleSubmit}
            loading={isPending}
            disabled={word.length < 5}
            color="success"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
