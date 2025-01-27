import { ReactNode } from "react";
import Header from "../ui/Header";
import { Box, Container } from "@mui/material";

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout = ({ children }: CustomLayoutProps) => {
  return (
    <div>
      <Header />
      <Box>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </div>
  );
};

export default CustomLayout;
