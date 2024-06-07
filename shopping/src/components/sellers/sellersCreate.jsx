import * as React from "react"
import { useContext, useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ButtonPpal, InputLight } from "../componentActions/componentAction";
import { ApiContext } from "@/context";
import { advertenceMessage, advertenceTrueMessage } from "@/context/sweetAlert";

export default function SellersCreate() {
    const { createSeller } = useContext(ApiContext);
    const [activeSesion, setActiveSesion] = useState();
    const [formData, setFormData] = useState({
        seller:'',
        contact:''
    });

    useEffect(() => {
        const storeId = 'storeId'; // Ajusta el storeId según tu clave de localStorage
        const sessionValue = localStorage.getItem(storeId);
        if (sessionValue && sessionValue !== '0') {
            setActiveSesion(sessionValue);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchCreateSeller = async (e) => {
        e.preventDefault();

        const { seller, contact } = formData;
        console.log(formData)

        try {
            const response = await createSeller('/sellers', 'POST', {
                seller,
                contact,
                userId: activeSesion
            });
            if(response.status === 200) {
                advertenceTrueMessage("Vendedor creado exitosamente");
            }
        } catch (error) {
            advertenceMessage("Error al crear vendedor");
        }
    }



    return (
        <Grid container mt={10}>
            <Grid xs={12} mb={3}>
                <Typography variant="h4">Crear nuevo vendedor</Typography>
            </Grid>
            <Grid xs={12} >
                <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <form onSubmit={fetchCreateSeller}>
                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='seller'
                                    name='Nombre'
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputLight
                                    nameValue='contact'
                                    name='Telefono'
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