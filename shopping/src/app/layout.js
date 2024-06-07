
import { Public_Sans } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import responsiveTheme from "./ui/theme";
import { ApiProvider } from "@/context";
import "./globals.css";
const Public = Public_Sans({ subsets: ["latin"]})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={Public.className}>
        <ThemeProvider theme={responsiveTheme}>
          <ApiProvider>{children}</ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
