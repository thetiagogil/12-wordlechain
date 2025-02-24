import { Stack } from "@mui/joy";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MainContainer = ({ children }: Props) => {
  return (
    <Stack sx={{ width: "100%", alignItems: "center" }}>
      <Stack component="main" sx={{ maxWidth: { xs: "92%", sm: 500 }, alignItems: "center", mt: 2, gap: 2 }}>
        {children}
      </Stack>
    </Stack>
  );
};
