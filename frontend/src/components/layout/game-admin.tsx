import { Button, Input, Stack } from "@mui/joy";
import { useState } from "react";

type GameAdminProps = {
  handleSetWord: (word: string) => void;
  isLoadingNewWord: boolean;
  isDisabled: boolean;
};

export const GameAdmin = ({ handleSetWord, isLoadingNewWord, isDisabled }: GameAdminProps) => {
  const [word, setWord] = useState<string>("");

  const handleOnButtonClick = () => {
    if (word.length === 5) {
      handleSetWord(word);
      setWord("");
    }
  };

  return (
    <Stack component="section" sx={{ flexDirection: "row", gap: 1, width: "100%" }}>
      <Input
        placeholder="Enter a 5 letter word..."
        value={word}
        onChange={e => setWord(e.target.value.toUpperCase())}
        disabled={isDisabled}
        sx={{ width: "60%" }}
      />
      <Button
        onClick={handleOnButtonClick}
        color="neutral"
        loading={isLoadingNewWord}
        disabled={isDisabled || word.length !== 5}
        sx={{ width: "40%" }}
      >
        Set New Word
      </Button>
    </Stack>
  );
};
