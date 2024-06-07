import * as React from "react"
import { useContext, useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ButtonPpal, InputLight, SelectLight } from "../componentActions/componentAction";
import { ApiContext } from "@/context";
import { advertenceTrueMessage, advertenceMessage } from "@/context/sweetAlert";


export default function CatalogCreate() {
    const { createProduct, getDepartment } = useContext(ApiContext);
    const [activeSesion, setActiveSesion] = useState();
    const [formData, setFormData] = useState({});
    const [dataDepartment, setDataDeparments] = useState()
    const [selectDep, setSelectDep] = useState('')

    useEffect(() => {
        const storeId = 'storeId'; // Nombre del id de la store en localStorage
        const sessionValue = localStorage.getItem(storeId);
        if (sessionValue && sessionValue !== '0') {
            setActiveSesion(sessionValue);
            const GetStore = async () => { // Traer las categorias para usarlas en el option categoryId
                try {
                    const { data } = await getDepartment(`/categories`, 'GET')
                    setDataDeparments(data);
                } catch (error) {
                    advertenceMessage('Error trer productos');
                }
            };
            GetStore();
        }
    }, [getDepartment]);

    const handleInputChange = (e) => { // manejo de datos tomados de los input y select
        const { name, value } = e.target;
        if (name == "categoryId") {
            setSelectDep(e.target.value);
        }
        setFormData({
            ...formData,
            [name]: value
        });

    };

    const fetchCreateSeller = async (e) => { // Crear producto
        e.preventDefault();

        const { name, image, description, price, stock, categoryId } = formData

        try {
            const response = await createProduct('/products', 'POST', {
                name,
                image,
                description,
                price,
                stock,
                categoryId,
                userId: activeSesion
            });
            if(response.status === 200){
                advertenceTrueMessage('Creación exitosa');
            }
        } catch (error) {
            advertenceMessage("Error al crear producto");
        }
    }

    const departmentOptions = dataDepartment && dataDepartment.data.map((option, index) => ({
        key: index,
        value: option.id,
        label: option.name,
    }));

    return (
        <Grid container mt={10}>
            <Grid xs={12} mb={3}>
                <Typography variant="h4">Crear nuevo Producto</Typography>
            </Grid>
            <Grid xs={12} >
                <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <form onSubmit={fetchCreateSeller}>
                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='name'
                                    name='Nombre'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='image'
                                    name='Link imagen'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='description'
                                    name='Descripcion'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='price'
                                    name='Precio'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='stock'
                                    name='Stock'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <SelectLight
                                    name='Departamento'
                                    nameValue='categoryId'
                                    value={selectDep}
                                    options={departmentOptions}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={12} display='flex' justifyContent='flex-end'>
                                <ButtonPpal
                                    typeButton='submit'
                                    colorButton='primary'
                                    textButton='Crear'
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}