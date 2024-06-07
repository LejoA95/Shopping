"use client"
import * as React from "react"
import { Box, IconButton, Slide } from "@mui/material";
import {
  Container,
  Typography,
} from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import store from "../../assets/icon_persons/person_store.png";
import ListNavBar from "../Lists/listNavBar";
import StoreMallDirectoryTwoToneIcon from '@mui/icons-material/StoreMallDirectoryTwoTone';
import CreateStore from "../store/createStore";
import { ApiContext } from "@/context";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import { advertenceMessage } from "@/context/sweetAlert";
// icons
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import BookmarkAddTwoToneIcon from '@mui/icons-material/BookmarkAddTwoTone';

const ContainerScroll = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: '#fff',
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
export default function Navbar() {
  const { getStore } = React.useContext(ApiContext)
  const [activeSesion, setActiveSesion] = React.useState();
  const [userActive, setUserActive] = React.useState(false);
  const [dataStore, setDataStore] = React.useState()
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const checkSession = () => {
      const storeId = 'storeId';
      const sessionValue = localStorage.getItem(storeId);
      if (sessionValue && sessionValue !== '0') {
        setActiveSesion(sessionValue);
        setUserActive(true)
        const GetStore = async () => {
          try {
            const { data } = await getStore(`users/${activeSesion}`, 'GET')
            setDataStore(data);
          } catch (error) {
            advertenceMessage('Error al traer datos');
          }
        };
        GetStore();
      }
    };
    checkSession();

    window.addEventListener("storage", checkSession);
    window.removeEventListener("storage", checkSession);
  }, [activeSesion, getStore, userActive]);

  const handleOpenMenu = () => {
    setMenuOpen(prevData => !prevData)
  }

  const general = [
    { text: "Mi tienda", keySection: 1, icon: <StoreMallDirectoryTwoToneIcon color="gris" />, link: "/" },
  ];

  const vendedores = [
    { text: "Lista de vendedores", keySection: 2, icon: <GroupTwoToneIcon fontSize="small" color="gris" />, link: "/sellers/list" },
    { text: "Crear vendedor", keySection: 3, icon: <GroupAddTwoToneIcon fontSize="small" color="gris" />, link: "/sellers/create" },
  ];
  const Departamentos = [
    { text: "Lista de departamentos", keySection: 4, icon: <DashboardTwoToneIcon fontSize="small" color="gris" />, link: "/department/list" },
    { text: "Crear departamento", keySection: 5, icon: <DashboardCustomizeTwoToneIcon fontSize="small" color="gris" />, link: "/department/create" },
  ];
  const Catalogo = [
    { text: "Lista de productos", keySection: 6, icon: <ShoppingCartTwoToneIcon fontSize="small" color="gris" />, link: "/catalog/list" },
    { text: "Crear producto", keySection: 7, icon: <AddShoppingCartTwoToneIcon fontSize="small" color="gris" />, link: "/catalog/create" },
  ];
  const ordenes = [
    { text: "Lista de ordenes", keySection: 8, icon: <BookmarkTwoToneIcon fontSize="small" color="gris" />, link: "/orders/list" },
    { text: "Crear Orden", keySection: 9, icon: <BookmarkAddTwoToneIcon fontSize="small" color="gris" />, link: "/orders/create" },
  ];


  return (
    <>
      <ContainerScroll maxWidth="xm" sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Box>
          <Typography variant="h4" mt={3} mb={1}> {userActive && dataStore ? dataStore.data.name : "MyStore"}</Typography>
          <ListNavBar title="General" items={general} />
          <ListNavBar title="Vendedores" items={vendedores} />
          <ListNavBar title="Departamentos" items={Departamentos} />
          <ListNavBar title="Catalogo" items={Catalogo} />
          <ListNavBar title="Ordenes" items={ordenes} />
        </Box>
        <Box
          position="sticky"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: ".5em",
            p: "2em 0",
          }}
        >
          <Box
            width="60px"
            sx={{ overflow: "hidden", borderRadius: "50%" }}
          >
            <Image
              src={store}
              style={{
                maxWidth: "100%",
                minHeight: "60px",
                width: "auto",
                height: "auto",
                maxHeight: "100%",
                objectFit: "cover",
              }}
              alt="logo"
            />
          </Box>
          <Typography variant="h6p" component="h6">
            {userActive && dataStore ? dataStore.data.name : "Tienda Rapida"}
          </Typography>
          <Typography variant="span" component="span" color="#999999" mb={2}>
            {userActive && dataStore ? dataStore.data.email : "Tienda@gmail.com"}
          </Typography>
          <CreateStore />
        </Box>
      </ContainerScroll>
      {/* version mobile */}
      <IconButton sx={{ display: { xs: 'flex', sm: 'none', position: 'absolute', top:'.5em' } }} onClick={handleOpenMenu}>
        <MenuTwoToneIcon fontSize="large" />
      </IconButton>
      <Slide direction='right' in={menuOpen} mountOnEnter unmountOnExit>
        <ContainerScroll maxWidth="xm" sx={{ display: { xs: 'flex', sm: 'none', position: 'absolute', zIndex: '100000000', borderRight: '1px solid #999999', backgroundColor: '#fff' } }}>
          <Box>
            <IconButton sx={{ display: { xs: 'flex', sm: 'none', position: 'absolute', right:'0', top:'.8em' } }} onClick={handleOpenMenu}>
              <CloseTwoToneIcon />
            </IconButton>
            <Typography variant="h4"  mt={3} mb={1}> {userActive && dataStore ? dataStore.data.name : "MyStore"}</Typography>
            <ListNavBar title="General" items={general} />
            <ListNavBar title="Vendedores" items={vendedores} />
            <ListNavBar title="Departamentos" items={Departamentos} />
            <ListNavBar title="Catalogo" items={Catalogo} />
            <ListNavBar title="Ordenes" items={ordenes} />
          </Box>
          <Box
            position="sticky"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".5em",
              p: "2em 0",
            }}
          >
            <Box
              width="60px"
              sx={{ overflow: "hidden", borderRadius: "50%" }}
            >
              <Image
                src={store}
                style={{
                  maxWidth: "100%",
                  minHeight: "60px",
                  width: "auto",
                  height: "auto",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
                alt="logo"
              />
            </Box>
            <Typography variant="h6p" component="h6">
              {userActive && dataStore ? dataStore.data.name : "Tienda Rapida"}
            </Typography>
            <Typography variant="span" component="span" color="#999999" mb={2}>
              {userActive && dataStore ? dataStore.data.email : "Tienda@gmail.com"}
            </Typography>
            <CreateStore />
          </Box>
        </ContainerScroll>
      </Slide>
    </>
  );
}
