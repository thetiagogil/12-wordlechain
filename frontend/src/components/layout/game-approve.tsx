import { Button, Stack } from "@mui/joy";
import { colors } from "../../theme/colors";
import { getColorTransparency } from "../../utils/get-color-transparency";
import { showToast } from "../../utils/toast";

type GameApproveProps = {
  handleApproveTokens: () => void;
  allowance: number;
  hasAllowance: boolean;
  isLoadingToken: boolean;
  isDisabled: boolean;
};

export const GameApprove = ({
  handleApproveTokens,
  allowance,
  hasAllowance,
  isLoadingToken,
  isDisabled
}: GameApproveProps) => {
  const handleCheckAllowance = async () => {
    showToast("info", `Your allowance is: ${allowance} TKN.`);
  };
  return (
    <Stack component="section" sx={{ flexDirection: "row", gap: 1, width: "100%" }}>
      <Button
        fullWidth
        onClick={handleApproveTokens}
        disabled={isDisabled || hasAllowance}
        loading={isLoadingToken}
        sx={{ bgcolor: getColorTransparency(colors.main.green, 70), "&:hover": { bgcolor: "main.green" } }}
      >
        {hasAllowance ? "Approved" : "Approve Tokens"}
      </Button>
      <Button fullWidth onClick={handleCheckAllowance} color="neutral" disabled={isDisabled}>
        Check Allowance
      </Button>
    </Stack>
  );
};
