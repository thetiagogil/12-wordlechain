import { Button, Stack } from "@mui/joy";
import { toast } from "react-toastify";

type GameApproveProps = {
  handleApproveTokens: () => void;
  allowance: number;
  isLoadingToken: boolean;
  isLoadingGame: boolean;
};

export const GameApprove = ({ handleApproveTokens, allowance, isLoadingToken, isLoadingGame }: GameApproveProps) => {
  const handleCheckAllowance = async () => {
    toast.info(`Your allowance is: ${allowance} TKN.`, { closeOnClick: true });
  };
  return (
    <Stack component="section" sx={{ flexDirection: "row", gap: 1 }}>
      <Button
        size="lg"
        fullWidth
        onClick={handleApproveTokens}
        color="success"
        disabled={allowance > 0 || isLoadingGame}
        loading={isLoadingToken}
        sx={{ bgcolor: "success.700" }}
      >
        {allowance > 0 ? "Approved" : "Approve Tokens"}
      </Button>
      <Button
        size="lg"
        fullWidth
        onClick={handleCheckAllowance}
        color="neutral"
        disabled={isLoadingToken || isLoadingGame}
      >
        Check Allowance
      </Button>
    </Stack>
  );
};
