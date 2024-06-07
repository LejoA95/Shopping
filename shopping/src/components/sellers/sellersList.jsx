import { Button, IconButton, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ApiContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ButtonPpal, InputLight } from "../componentActions/componentAction";
import { advertenceMessage, advertenceTrueMessage } from "@/context/sweetAlert";


export default function SellersList() {
    const { getSeller, deleteSeller, updateSeller } = useContext(ApiContext)
    const [activeSesion, setActiveSesion] = useState()
    const [dataSellers, setDataSellers] = useState()
    const [editSellerId, setEditSellerId] = useState(null)
    const [sellerChanges, setSellerChanges] = useState({})

    useEffect(() => {
        const checkSession = () => {
            const storeId = 'storeId';
            const sessionValue = localStorage.getItem(storeId);
            if (sessionValue && sessionValue !== '0') {
                setActiveSesion(sessionValue);
                const GetSeller = async () => {
                    try {
                        const { data } = await getSeller(`/sellers`, 'GET')
                        setDataSellers(data);
                    } catch (error) {
                        advertenceMessage('Error al traer vendedores');
                    }
                };
                GetSeller();
            }
        };
        checkSession();

        window.addEventListener("storage", checkSession);
        window.removeEventListener("storage", checkSession);
    }, [getSeller, activeSesion]);

    const fetchDeleteSeller = async (sellerId) => {

        try {
            const response = await deleteSeller(`/sellers/${sellerId}`, 'DELETE');
            if (response.status === 200) {
                advertenceTrueMessage('Eliminado exitosamente');
            }
        } catch (error) {
           advertenceMessage("Error al eliminar");
        }
    }

    const handleEditClick = (seller) => {
        setEditSellerId(seller.id);
        setSellerChanges(seller);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSellerChanges(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const editSeller = async (e) => {
        e.preventDefault();
        try {
            const response = await updateSeller(`/sellers/${editSellerId}`, 'PUT', sellerChanges);
            if (response.status === 200) {
                advertenceTrueMessage('Actualización exitosa');
                setEditSellerId(null)
            }
        } catch (error) {
            advertenceMessage('Error de actualización', error);
        }
    }

    return (
        <Grid container mt={10}>
            <Grid xs={12} mb={3}>
                <Typography variant="h4">Lista de vendedores</Typography>
            </Grid>
            <Grid xs={12} >
                <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <form onSubmit={editSeller}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><Typography variant="h6">Código</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Vendedor</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Telefono</Typography></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataSellers && dataSellers.data && dataSellers.data.length > 0 ? (
                                        dataSellers.data.map((seller) => (
                                            <TableRow
                                                key={seller.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{seller.id}</TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {editSellerId === seller.id ?
                                                        <InputLight
                                                            nameValue='name'
                                                            value={seller.name}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : seller.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {editSellerId === seller.id ?
                                                        <InputLight
                                                            nameValue='phone'
                                                            value={seller.phone}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : seller.phone}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {editSellerId === seller.id ?
                                                        <ButtonPpal
                                                            typeButton='submit'
                                                            colorButton='primary'
                                                            textButton='Guardar'
                                                            onClickButton={editSeller}
                                                        /> : <>
                                                            <IconButton onClick={() => handleEditClick(seller)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => fetchDeleteSeller(seller.id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell align="center" colSpan={4}>
                                                <Typography variant="h6">No hay vendedores registrados</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}