import { Button, IconButton, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import { ButtonPpal, InputLight } from "../componentActions/componentAction";

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
export default function CatalogList() {


    const { getProduct, deleteProduct, updateProduct } = useContext(ApiContext)
    const [dataProduct, setDataDeparments] = useState()
    const [productId, setProductId] = useState(null)
    const [productChanges, setProductChanges] = useState({})

    useEffect(() => {
        const GetStore = async () => {
            try {
                const { data } = await getProduct(`/products`, 'GET')
                setDataDeparments(data);
            } catch (error) {
                advertenceMessage('Error trer departamentos');
            }
        };
        GetStore();
    }, [getProduct])

    const fetchDeleteSeller = async (productId) => {

        try {
            const response = await deleteProduct(`/products/${productId}`, 'DELETE');
            if (response.status === 200) {
                advertenceTrueMessage('Eliminado exitosamente');
            }
        } catch (error) {
            advertenceMessage("Error al eliminar");
        }
    }

    const handleEditClick = (product) => {
        setProductId(product.id);
        setProductChanges(product);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductChanges(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const editProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProduct(`/products/${productId}`, 'PUT', productChanges);
            if (response.status === 200) {
                advertenceTrueMessage('Actualización exitosa');
                setProductChanges(null)
                setProductId(null)
            }
        } catch (error) {
            advertenceMessage('Error de actualización');
        }
    }

    return (
        <Grid container mt={10}>
            <Grid xs={12} mb={3}>
                <Typography variant="h4">Lista de Productos</Typography>
            </Grid>
            <Grid xs={12} >
                <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <form onSubmit={editProduct}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><Typography variant="h6">Código</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Imagen</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Producto</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Descripción</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Color</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Price</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Stock</Typography></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataProduct && dataProduct.data && dataProduct.data.length > 0 ? (
                                        dataProduct.data.map((product) => (
                                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="center">{product.id}</TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {productId === product.id ?
                                                        <InputLight
                                                            nameValue='image'
                                                            value={product.image}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        : <img src={product.image} style={{ width: '80px', aspectRatio: '1/1', objectFit: 'cover' }} alt="" />}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {productId === product.id ?
                                                        <InputLight
                                                            nameValue='name'
                                                            value={product.name}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : product.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {productId === product.id ?
                                                        <InputLight
                                                            nameValue='description'
                                                            value={product.description}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : <span className="content_description-product">
                                                            {product.description}
                                                        </span>}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {productId === product.id ?
                                                        <InputLight
                                                            nameValue='color'
                                                            value={product.color}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : product.color}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {productId === product.id ?
                                                        <InputLight
                                                            nameValue='price'
                                                            value={product.price}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : <span>
                                                            $ {product.price}
                                                        </span>}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center">
                                                    {productId === product.id ?
                                                        <InputLight
                                                            nameValue='stock'
                                                            value={product.stock}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : product.stock}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {productId === product.id ?
                                                        <ButtonPpal
                                                            typeButton='submit'
                                                            colorButton='primary'
                                                            textButton='Guardar'
                                                            onClickButton={editProduct}
                                                        /> : <>
                                                            <IconButton onClick={() => handleEditClick(product)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => fetchDeleteSeller(product.id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell align="center" colSpan={8}>
                                                <Typography variant="h6">No hay productos registrados</Typography>
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