"use client";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ApiContext } from "@/context";
import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import CatalogList from "@/components/catalog/catalogLis";
import CatalogCreate from "@/components/catalog/catalogCreate";
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
export default function Catalog() {
    const { catalogSection } = useParams()


    return (
        <ContainerScroll maxWidth="lg">
            {catalogSection === "list" ? <CatalogList /> :
                    catalogSection === "create" ? <CatalogCreate /> : null}
        </ContainerScroll>
    );

}
