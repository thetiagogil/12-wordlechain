import { Box, Grid, Stack } from "@mui/joy";
import { motion } from "framer-motion";
import { LETTER_BG_COLORS, NUMBER_OF_GUESSES } from "../../config/constants";

type GameGuessBoxProps = {
  guess: string;
  getPlayerGuessesArray: string[];
  getLetterStatusesArray: { data: number[] }[];
};

export const GameGuess = ({ guess, getPlayerGuessesArray, getLetterStatusesArray }: GameGuessBoxProps) => {
  const getPlayerGuesses = () => {
    // This adds the rows of the player's previous guesses
    const guessesToShow = [...getPlayerGuessesArray];
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
    <Stack component="section" sx={{ gap: 1 }}>
      {getPlayerGuesses().map((rowGuess: string, rowIndex: number) => (
        <Grid container key={rowIndex} sx={{ justifyContent: "center", gap: 1 }}>
          {Array.from(rowGuess).map((letter, colIndex) => {
            const isCurrentRow = rowIndex === getPlayerGuessesArray.length;
            const backgroundColor = getLettersBgColor(rowIndex, colIndex, getLetterStatusesArray, LETTER_BG_COLORS);
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
                  height: 60,
                  width: 60,
                  border: "1px solid",
                  borderColor: "neutral.700",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 32,
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
