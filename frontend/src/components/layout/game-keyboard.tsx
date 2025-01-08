import { Button, Stack } from "@mui/joy";
import { useMemo } from "react";
import { LETTER_BG_COLORS } from "../../utils/colors";

type GameKeyboardProps = {
  guess: string;
  setGuess: (value: string | ((value: string) => string)) => void;
  handleSubmitGuess: (allowance: number, onSuccess?: () => void) => void;
  allowance: number;
  hasPlayerGuessedCorrectly: boolean;
  playerGuessesArray: string[];
  letterStatusesArray: { data: number[] }[];
  isLoadingGame: boolean;
  isDisabled: boolean;
};

export const GameKeyboard = ({
  guess,
  setGuess,
  handleSubmitGuess,
  allowance,
  hasPlayerGuessedCorrectly,
  playerGuessesArray,
  letterStatusesArray,
  isLoadingGame,
  isDisabled
}: GameKeyboardProps) => {
  const ROW1 = "QWERTYUIOP".split("");
  const ROW2 = "ASDFGHJKL".split("");
  const ROW3 = "ZXCVBNM".split("");
  const lettersSize = { width: { xs: 32, md: 40 }, height: 55, p: { xs: 1, sm: "auto" } };
  const actionsSize = { width: { xs: 52, md: 62 }, height: 55 };

  const handleOnLetterClick = (letter: string) => {
    if (guess.length < 5) setGuess(prev => prev + letter);
  };

  const handleDelete = () => {
    if (guess.length > 0) setGuess(prev => prev.slice(0, -1));
  };

  const letterButton = (letter: string) => {
    const getLetterStatusesForKeyboard = (guessesArray: string[], statusesArray: { data: number[] }[]) => {
      const letterStatuses = {} as { [key: string]: number };

      // Iterate over each guess
      guessesArray.forEach((guess, guessIndex) => {
        const statuses = statusesArray[guessIndex]?.data || [];
        // Iterate over each guess letter
        guess.split("").forEach((letter, letterIndex) => {
          const currentStatus = statuses[letterIndex];
          // Add letter with corresponding status to the new array
          if (currentStatus >= (letterStatuses[letter] || 0)) {
            letterStatuses[letter] = currentStatus;
          }
        });
      });

      return letterStatuses;
    };

    const useLetterStatusesForKeyboard = useMemo(() => {
      return getLetterStatusesForKeyboard(playerGuessesArray, letterStatusesArray);
    }, [playerGuessesArray, letterStatusesArray]);

    const bgcolor = LETTER_BG_COLORS[useLetterStatusesForKeyboard[letter]] || "neutral.700";

    return (
      <Button
        key={letter}
        onClick={() => handleOnLetterClick(letter)}
        color="neutral"
        disabled={isDisabled || allowance <= 0 || hasPlayerGuessedCorrectly}
        sx={{
          ...lettersSize,
          bgcolor,
          fontWeight: "bold",
          ":hover": { bgcolor, borderColor: "white" }
        }}
      >
        {letter}
      </Button>
    );
  };

  return (
    <Stack component="section" sx={{ justifyContent: "center", gap: 0.5, width: "100%" }}>
      <Stack sx={{ justifyContent: "center", flexDirection: "row", gap: 0.5 }}>
        {ROW1.map(letter => letterButton(letter))}
      </Stack>
      <Stack sx={{ justifyContent: "center", flexDirection: "row", gap: 0.5 }}>
        {ROW2.map(letter => letterButton(letter))}
      </Stack>
      <Stack sx={{ justifyContent: "center", flexDirection: "row", gap: 0.5 }}>
        <Button onClick={handleDelete} color="neutral" disabled={isDisabled || guess.length <= 0} sx={actionsSize}>
          Delete
        </Button>
        {ROW3.map(letter => letterButton(letter))}
        <Button
          onClick={() =>
            handleSubmitGuess(allowance, () => {
              setGuess("");
            })
          }
          color="success"
          disabled={isDisabled || guess.length < 5}
          loading={isLoadingGame}
          sx={{ ...actionsSize, bgcolor: "success.700" }}
        >
          Enter
        </Button>
      </Stack>
    </Stack>
  );
};
