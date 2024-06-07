"use client";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import OrdersList from "@/components/orders/ordersList";
import OrdersCreate from "@/components/orders/ordersCreate";

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
    const { ordersSection } = useParams()

    return (
        <ContainerScroll maxWidth="lg">
            {ordersSection === "list" ? <OrdersList /> :
                ordersSection === "create" ? <OrdersCreate /> : null}
        </ContainerScroll>
    );

}
