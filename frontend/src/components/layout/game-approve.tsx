import { Button, Stack } from "@mui/joy";
import { showToast } from "../../utils/toast";

type GameApproveProps = {
  handleApproveTokens: () => void;
  allowance: number;
  isLoadingToken: boolean;
  isDisabled: boolean;
};

export const GameApprove = ({ handleApproveTokens, allowance, isLoadingToken, isDisabled }: GameApproveProps) => {
  const handleCheckAllowance = async () => {
    showToast("info", `Your allowance is: ${allowance} TKN.`);
  };
  return (
    <Stack component="section" sx={{ flexDirection: "row", gap: 1, width: "100%" }}>
      <Button
        fullWidth
        onClick={handleApproveTokens}
        color="success"
        disabled={isDisabled || allowance > 0}
        loading={isLoadingToken}
        sx={{ bgcolor: "success.700" }}
      >
        {allowance > 0 ? "Approved" : "Approve Tokens"}
      </Button>
      <Button fullWidth onClick={handleCheckAllowance} color="neutral" disabled={isDisabled}>
        Check Allowance
      </Button>
    </Stack>
  );
};
