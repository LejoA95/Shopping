import * as React from "react"
import { useContext, useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ButtonPpal, InputLight } from "../componentActions/componentAction";
import { ApiContext } from "@/context";
import { advertenceTrueMessage, advertenceMessage } from "@/context/sweetAlert";

export default function DepartmentCreate() {
    const { createDepartment } = useContext(ApiContext);
    const [formData, setFormData] = useState({});



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchCreateDepartment = async (e) => {
        e.preventDefault();

        try {
            const response = await createDepartment('/categories', 'POST', formData);
            if(response.status === 200){
                advertenceTrueMessage('Departamento creado exitosamente');
            }
        } catch (error) {
            advertenceMessage("Error al crear departamento");
        }
    }



    return (
        <Grid container mt={10}>
            <Grid xs={12} mb={3}>
                <Typography variant="h4">Crear nuevo departamento</Typography>
            </Grid>
            <Grid xs={12} >
                <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <form onSubmit={fetchCreateDepartment}>
                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                <InputLight
                                    nameValue='name'
                                    name='Nombre'
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