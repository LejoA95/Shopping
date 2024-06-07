import { Box, Button, ButtonBase, Collapse, FormControl, IconButton, Modal, Paper, Typography } from "@mui/material";
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
import { advertenceTrueMessage, advertenceMessage } from "@/context/sweetAlert";

export default function OrdersList() {
    const { getOrders, deleteOrder, updateOrders, deleteProductOrder, updateProductOrders } = useContext(ApiContext)
    const [dataOrders, setDataOrders] = useState()
    const [details, setDetails] = useState(false);
    const [editOrderId, setOrderId] = useState(null)
    const [orderChanges, setOrderChanges] = useState({})

    const [editProductOrderId, setProductOrderId] = useState(null)
    const [productOrderChanges, setProductOrderChanges] = useState({})

    useEffect(() => {
        const GetStore = async () => {
            try {
                const { data } = await getOrders(`/orders`, 'GET')
                setDataOrders(data);
            } catch (error) {
                advertenceMessage('Error al traer datos');
            }
        };
        GetStore();
    }, [getOrders])

    const handleDetails = () => {
        setDetails((prev) => !prev);
    };


    const fetchDeleteOrder = async (orderId) => {

        try {
            const response = await deleteOrder(`/orders/${orderId}`, 'DELETE');
            if (response.status === 200) {
                advertenceTrueMessage('Eliminación exitosa');
            }
        } catch (error) {
            advertenceMessage("Error al eliminar");
        }
    }

    const handleEditClick = (order) => {
        setOrderId(order.id);
        setOrderChanges(order);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderChanges(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const editOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await updateOrders(`/orders/${editOrderId}`, 'PUT', orderChanges);
            if (response.status === 200) {
                advertenceTrueMessage('Actualización exitosa');
                setOrderId(null)
            }
        } catch (error) {
            advertenceMessage('Error de actualización:');
        }
    }


    const handleEditProductOrderClick = (product) => {
        setProductOrderId(product.id);
        console.log(product.id)
        // setProductOrderChanges(product);
    }

    const handleInputChangeOrderProduct = (e) => {
        const { name, value } = e.target;
        setProductOrderChanges(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const fetchDeleteProductsOrder = async (productOrderId) => {

        try {
            const response = await deleteProductOrder(`/details-orders/${productOrderId}`, 'DELETE');
            if (response.status === 200) {
                advertenceTrueMessage('Eliminación exitosa');
            }
        } catch (error) {
            advertenceMessage("Error al eliminar");
        }
    }


    const editProductOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProductOrders(`/details-orders/${editProductOrderId}`, 'PUT', productOrderChanges);
            if (response.status === 200) {
                advertenceTrueMessage('Actualización exitosa');
                setProductOrderId(null)
            }
        } catch (error) {
            advertenceMessage('Error de actualización:', error);
        }
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '.5em',
        p: 4,
    };

    return (
        <Grid container mt={10}>
            <Grid xs={12} mb={3}>
                <Typography variant="h4">Lista de Ordenes</Typography>
            </Grid>
            <Grid xs={12} >
                <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <form onSubmit={editOrder}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Id</TableCell>
                                        <TableCell align="left">Vendedor</TableCell>
                                        <TableCell align="left">Metodo de pago</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell align="left">Detalles</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataOrders && dataOrders.data && dataOrders.data.length > 0 ? (
                                        dataOrders.data.map((order) => (
                                            <TableRow
                                                key={order.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{order.id}</TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {editOrderId === order.id ?
                                                        <InputLight
                                                            nameValue='sellerId'
                                                            value={order.sellerId}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : order.sellerId}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {editOrderId === order.id ?
                                                        <InputLight
                                                            nameValue='paymentMethod'
                                                            value={order.paymentMethod}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : order.paymentMethod}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {editOrderId === order.id ?
                                                        <InputLight
                                                            nameValue='status'
                                                            value={order.status}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : order.status}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <ButtonBase onClick={handleDetails}>Detalles</ButtonBase>
                                                    <Modal
                                                        open={details}
                                                        onClose={handleDetails}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box sx={style}>
                                                            <FormControl>Hola</FormControl>
                                                            <form onSubmit={editProductOrder}>
                                                                <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                                                                    Productos
                                                                </Typography>
                                                                <TableContainer component={Paper}>
                                                                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell align="left">Id</TableCell>
                                                                                <TableCell align="left">Nombre</TableCell>
                                                                                <TableCell align="left">color</TableCell>
                                                                                <TableCell align="left">Price</TableCell>
                                                                                <TableCell align="left">Cantidad</TableCell>
                                                                                <TableCell align="right"></TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {order && order.products.map((product) => (
                                                                                <TableRow
                                                                                    key={product.id}
                                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                >
                                                                                    <TableCell align="left">{product.id}</TableCell>
                                                                                    <TableCell component="th" scope="row" align="left">
                                                                                        {product.name}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="left">
                                                                                        {product.color}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="left">
                                                                                        {product.price}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="left">
                                                                                        {editProductOrderId === product.OrderProduct.id ?
                                                                                            <InputLight
                                                                                                nameValue='quantity'
                                                                                                value={product.OrderProduct.quantity}
                                                                                                onChange={handleInputChangeOrderProduct}
                                                                                                typeInput='number'
                                                                                                full={false} />
                                                                                            : product.OrderProduct.quantity}
                                                                                    </TableCell>
                                                                                    <TableCell align="right">
                                                                                        {editProductOrderId === product.OrderProduct.id ?
                                                                                            <ButtonPpal
                                                                                                typeButton='submit'
                                                                                                colorButton='primary'
                                                                                                textButton='Guardar'
                                                                                                onClickButton={editProductOrder}
                                                                                            /> : <>
                                                                                                <IconButton onClick={() => handleEditProductOrderClick(product.OrderProduct)}>
                                                                                                    <EditIcon />
                                                                                                </IconButton>
                                                                                                <IconButton onClick={() => fetchDeleteProductsOrder(product.OrderProduct.id)}>
                                                                                                    <DeleteIcon />
                                                                                                </IconButton>
                                                                                            </>}
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </form>
                                                        </Box>
                                                    </Modal>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {editOrderId === order.id ?
                                                        <ButtonPpal
                                                            typeButton='submit'
                                                            colorButton='primary'
                                                            textButton='Guardar'
                                                            onClickButton={editOrder}
                                                        /> : <>
                                                            <IconButton onClick={() => handleEditClick(order)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => fetchDeleteOrder(order.id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell align="center" colSpan={8}>
                                                <Typography variant="h6">No hay órdenes registradas</Typography>
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