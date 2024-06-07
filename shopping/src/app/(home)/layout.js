
import {  ThemeProvider } from "@mui/material";
import responsiveTheme from "../ui/theme";
import { ApiProvider } from "@/context";
import "../globals.css";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "@/components/NavBar/NavBar";
export default function Home(props) {
  const { children } = props;
  return (
    <ThemeProvider theme={responsiveTheme}>
      <Grid container className="home_body" wrap="nowrap">
        <Grid xs={1.8} minWidth={280} position={{xs:'absolute', sm:'relative'}}>
          <Navbar />
        </Grid>
        <Grid xs={12} sm={10.2}>
            <ApiProvider>{children}</ApiProvider>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
