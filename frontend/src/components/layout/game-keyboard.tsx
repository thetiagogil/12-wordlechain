import { Button, Stack } from "@mui/joy";

type GameKeyboardProps = {
  guess: string;
  setGuess: (value: string | ((value: string) => string)) => void;
  handleSubmitGuess: (allowance: number, onSuccess?: () => void) => void;
  allowance: number;
  hasPlayerGuessedCorrectly: boolean;
  isLoadingGame: boolean;
  isDisabled: boolean;
};

export const GameKeyboard = ({
  guess,
  setGuess,
  handleSubmitGuess,
  allowance,
  hasPlayerGuessedCorrectly,
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

  return (
    <Stack component="section" sx={{ justifyContent: "center", gap: 0.5, width: "100%" }}>
      <Stack sx={{ justifyContent: "center", flexDirection: "row", gap: 0.5 }}>
        {ROW1.map(letter => (
          <Button
            key={letter}
            onClick={() => handleOnLetterClick(letter)}
            color="neutral"
            disabled={isDisabled || allowance <= 0 || hasPlayerGuessedCorrectly}
            sx={lettersSize}
          >
            {letter}
          </Button>
        ))}
      </Stack>
      <Stack sx={{ justifyContent: "center", flexDirection: "row", gap: 0.5 }}>
        {ROW2.map(letter => (
          <Button
            key={letter}
            onClick={() => handleOnLetterClick(letter)}
            color="neutral"
            disabled={isDisabled || allowance <= 0 || hasPlayerGuessedCorrectly}
            sx={lettersSize}
          >
            {letter}
          </Button>
        ))}
      </Stack>
      <Stack sx={{ justifyContent: "center", flexDirection: "row", gap: 0.5 }}>
        <Button onClick={handleDelete} color="neutral" disabled={isDisabled || guess.length <= 0} sx={actionsSize}>
          Delete
        </Button>
        {ROW3.map(letter => (
          <Button
            key={letter}
            onClick={() => handleOnLetterClick(letter)}
            color="neutral"
            disabled={isDisabled || allowance <= 0 || hasPlayerGuessedCorrectly}
            sx={lettersSize}
          >
            {letter}
          </Button>
        ))}
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
