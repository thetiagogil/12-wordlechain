import { extendTheme } from "@mui/joy/styles";

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: "#121213"
        }
      }
    }
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.neutral[700],
          border: "1px solid",
          borderRadius: "2px",
          borderColor: theme.vars.palette.neutral[600],
          transition: "0.3s",
          ":hover": {
            borderColor: "white"
          }
        })
      }
    },
    JoyInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: "1px solid",
          borderRadius: "2px",
          borderColor: theme.vars.palette.neutral[600],
          transition: "0.3s",
          ":hover": {
            borderColor: "white"
          }
        })
      }
    }
  }
});
