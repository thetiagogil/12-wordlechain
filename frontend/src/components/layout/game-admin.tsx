import { Button, Input, Stack } from "@mui/joy";
import { useState } from "react";

type GameAdminProps = {
  handleSetWord: (word: string) => void;
  isLoading: boolean;
};

export const GameAdmin = ({ handleSetWord, isLoading }: GameAdminProps) => {
  const [word, setWord] = useState<string>("");

  return (
    <Stack component="section" sx={{ flexDirection: "row", gap: 1 }}>
      <Input
        size="lg"
        placeholder="Enter a word..."
        value={word}
        onChange={e => setWord(e.target.value.toUpperCase())}
        disabled={isLoading}
      />
      <Button
        size="lg"
        fullWidth
        onClick={() => handleSetWord(word)}
        color="neutral"
        loading={isLoading}
        disabled={isLoading || word.length !== 5}
      >
        Set New Word
      </Button>
    </Stack>
  );
};
