import * as React from "react"
import { useContext, useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ButtonPpal, InputLight } from "../componentActions/componentAction";
import { ApiContext } from "@/context";
import { advertenceMessage, advertenceTrueMessage } from "@/context/sweetAlert";

export default function OrdersCreate() {
    const { createOrder, getProduct, createProductOrder, deleteOrder } = useContext(ApiContext);
    const [dataProduct, setDataProducts] = useState()
    const [activeSesion, setActiveSesion] = useState();
    const [formData, setFormData] = useState({});
    const [formDataProduct, setFormDataProduct] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [orderCreate, setOrderCreate] = useState(false)
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const storeId = 'storeId'; // Ajusta el storeId según tu clave de localStorage
        const sessionValue = localStorage.getItem(storeId);
        if (sessionValue && sessionValue !== '0') {
            setActiveSesion(sessionValue);
        }
        const GetStore = async () => {
            try {
                const { data } = await getProduct(`/products`, 'GET')
                setDataProducts(data);
            } catch (error) {
                advertenceMessage('Error al traer datos');
            }
        };
        GetStore();
    }, [getProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleInputChangeProduct = (e, product_id) => {
        const { name, value } = e.target;
        setFormDataProduct({
            ...formDataProduct,
            [name]: value,
            productId: product_id
        });
    };


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const fetchCreateOrder = async (e) => {
        e.preventDefault();
        const { sellerId, status, paymentMethod } = formData;

        try {
            const response = await createOrder('orders', 'POST', {
                sellerId,
                status,
                paymentMethod
            });
            if (response.data && response.data.data && response.data.data.id) {
                setOrderId(response.data.data.id);
            }
            if (response.status === 200) {
                advertenceTrueMessage('Orden creada exitosamente');
                setOrderCreate(true);
            }
        } catch (error) {
            advertenceMessage("Error al crear orden", error);
        }
    }

    const fetchCreateProductOrder = async (e) => {
        e.preventDefault();

        const { quantity, productId } = formDataProduct

        try {
            const response = await createProductOrder('/details-orders', 'POST', {
                orderId: orderId,
                productId,
                quantity
            });
            if(response.status === 200){
                advertenceTrueMessage('Orden creada exitosamente');
            }
        } catch (error) {
            advertenceMessage("El producto no se puede agregar", error);
        }
    }

    const fetchDeleteOrder = async (e) => {
        e.preventDefault();

        try {
            const response = await createProductOrder(`/orders/${orderId}`, 'DELETE');
            if (response.status === 200) {
                advertenceTrueMessage('Orden eliminada exitosamente');
            }
        } catch (error) {
            advertenceMessage("Error al eliminar orden", error);
        }
    }

    const filteredProducts = dataProduct && dataProduct.data ? dataProduct.data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrar por nombre
        product.id.toString() === searchTerm // Filtrar por ID
    ) : [];


    return (
        <Grid container mt={10}>
            <Grid xs={12} mb={3}>
                <Typography variant="h4">Crear nueva orden</Typography>
            </Grid>
            <Grid xs={12} >
                <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <form onSubmit={fetchCreateOrder}>
                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='sellerId'
                                    name='Vendedor'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='status'
                                    name='Estado'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='paymentMethod'
                                    name='Metodo de pago'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={12} display='flex' justifyContent='flex-end'>
                                {orderCreate ?
                                    <ButtonPpal
                                        colorButton='error'
                                        textButton='Cancelar'
                                        onClickButton={fetchDeleteOrder}
                                    /> :
                                    <ButtonPpal
                                        typeButton='submit'
                                        colorButton='primary'
                                        textButton='Crear'
                                    />}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
            {orderCreate && (
                <>
                    <Grid xs={12} mb={3} mt={3}>
                        <Typography variant="h4">Agrega los productos a tu orden</Typography>
                    </Grid>
                    <Grid xs={12} >
                        <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                            <Grid container spacing={2}>
                                <Grid xs={12}>
                                    <InputLight
                                        name='Buscar producto'
                                        onChange={handleSearch}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    {filteredProducts.map((product) => (
                                        <form onSubmit={fetchCreateProductOrder} key={product.id}>
                                            <Box>
                                                <Typography>{product.name}</Typography>
                                                <Typography>{product.id}</Typography>
                                                <InputLight
                                                    nameValue='quantity'
                                                    name='Cantidad'
                                                    typeInput='number'
                                                    onChange={(e) => handleInputChangeProduct(e, product.id)}
                                                />
                                                <ButtonPpal
                                                    typeButton='submit'
                                                    colorButton='primary'
                                                    textButton='Agregar a orden'
                                                />
                                            </Box>
                                        </form>
                                    ))}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </>
            )}

        </Grid>
    )
}