"use client";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import SellersList from "@/components/sellers/sellersList";
import SellersCreate from "@/components/sellers/sellersCreate";
import styled from "@emotion/styled";


const ContainerScroll = styled(Container)(() => ({
  height: "100vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: 2,
    backgroundColor: "#01111d10",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#022946",
    borderRadius: ".8em",
  },
}));

export default function Sellers() {
  const { sellersSection } = useParams()

  return (
    <ContainerScroll maxWidth="lg">
      {sellersSection === "list" ? <SellersList /> : sellersSection === "create" ? <SellersCreate />  : null}
    </ContainerScroll>
  );

}
