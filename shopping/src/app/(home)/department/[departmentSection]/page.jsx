"use client";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ApiContext } from "@/context";
import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import DeparmentList from "@/components/departments/departmentList";
import DepartmentCreate from "@/components/departments/departmentCreate";
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

export default function Department() {
    const { departmentSection } = useParams()


    return (
        <ContainerScroll maxWidth="lg">
            {departmentSection === "list" ? <DeparmentList /> :
                    departmentSection === "create" ? <DepartmentCreate /> : null}
        </ContainerScroll>
    );

}
