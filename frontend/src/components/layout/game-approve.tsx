import { Button, Stack } from "@mui/joy";
import { showToast } from "../../utils/toast";

type GameApproveProps = {
  handleApproveTokens: () => void;
  allowance: number;
  isLoadingToken: boolean;
  isLoadingGame: boolean;
};

export const GameApprove = ({ handleApproveTokens, allowance, isLoadingToken, isLoadingGame }: GameApproveProps) => {
  const handleCheckAllowance = async () => {
    showToast("info", `Your allowance is: ${allowance} TKN.`);
  };
  return (
    <Stack component="section" sx={{ flexDirection: "row", gap: 1, width: "100%" }}>
      <Button
        fullWidth
        onClick={handleApproveTokens}
        color="success"
        disabled={allowance > 0 || isLoadingGame}
        loading={isLoadingToken}
        sx={{ bgcolor: "success.700" }}
      >
        {allowance > 0 ? "Approved" : "Approve Tokens"}
      </Button>
      <Button fullWidth onClick={handleCheckAllowance} color="neutral" disabled={isLoadingToken || isLoadingGame}>
        Check Allowance
      </Button>
    </Stack>
  );
};
