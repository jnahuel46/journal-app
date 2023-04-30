import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme } from "./purpleTheme";


 {/* Its a HOC that receives the children, the children will be the main component */}
const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      {/* The CssBaseline component helps to kickstart an elegant, consistent, and simple baseline to build upon.
ads via Carbon */}
      <CssBaseline />
      { children }
    </ThemeProvider>
  );
};

export default AppTheme;
