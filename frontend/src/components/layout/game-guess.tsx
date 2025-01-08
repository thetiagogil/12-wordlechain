import { Box, Grid, Stack } from "@mui/joy";
import { motion } from "framer-motion";
import { NUMBER_OF_GUESSES } from "../../config/constants";
import { LETTER_BG_COLORS } from "../../utils/colors";

type GameGuessBoxProps = {
  guess: string;
  playerGuessesArray: string[];
  letterStatusesArray: { data: number[] }[];
};

export const GameGuess = ({ guess, playerGuessesArray, letterStatusesArray }: GameGuessBoxProps) => {
  const getPlayerGuesses = () => {
    // This adds the rows of the player's previous guesses
    const guessesToShow = [...playerGuessesArray];
    // This adds the row where the player is typing the current guess
    if (guessesToShow.length < NUMBER_OF_GUESSES) {
      guessesToShow.push(guess.padEnd(5, " "));
    }
    // This adds aditional empty rows until NUMBER_OF_GUESSES is matched
    while (guessesToShow.length < NUMBER_OF_GUESSES) {
      guessesToShow.push("".padEnd(5, " "));
    }
    return guessesToShow;
  };

  const getLettersBgColor = (
    rowIndex: number,
    colIndex: number,
    array: { data: number[] }[],
    colors: object
  ): string => {
    const status = array[rowIndex]?.data?.[colIndex];
    return status !== undefined ? colors[status as keyof typeof colors] : "transparent";
  };

  return (
    <Stack component="section" sx={{ gap: 1, width: "100%" }}>
      {getPlayerGuesses().map((rowGuess: string, rowIndex: number) => (
        <Grid container key={rowIndex} sx={{ justifyContent: "center", gap: 1 }}>
          {Array.from(rowGuess).map((letter, colIndex) => {
            const isCurrentRow = rowIndex === playerGuessesArray.length;
            const backgroundColor = getLettersBgColor(rowIndex, colIndex, letterStatusesArray, LETTER_BG_COLORS);
            return (
              <Box
                key={colIndex}
                component={motion.div}
                initial={{ scale: 1 }}
                animate={isCurrentRow && letter.trim() && { scale: [1, 1.1, 1] }}
                transition={{ duration: 0.1 }}
                sx={{
                  color: "#F8F8ED",
                  backgroundColor,
                  height: { xs: 56, sm: 64 },
                  width: { xs: 56, sm: 64 },
                  border: "1px solid",
                  borderColor: "neutral.700",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: { xs: 28, sm: 32 },
                  fontWeight: "bold"
                }}
              >
                {letter.trim().toUpperCase()}
              </Box>
            );
          })}
        </Grid>
      ))}
    </Stack>
  );
};
