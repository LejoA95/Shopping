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
import { advertenceTrueMessage, advertenceMessage } from "@/context/sweetAlert";


export default function DeparmentList() {


    const { getDepartment, updateDepartment, deleteDepartment } = useContext(ApiContext)
    const [dataDepartment, setDataDeparments] = useState()
    const [departmentId, setDepartmentId] = useState(null)
    const [departmentChanges, setDepartmentChanges] = useState({})

    useEffect(() => {
        const GetStore = async () => {
            try {
                const { data } = await getDepartment(`/categories`, 'GET')
                setDataDeparments(data);
            } catch (error) {
                advertenceMessage('Error trer departmentos');
            }
        };
        GetStore();
    }, [getDepartment]);


    const fetchDeleteSeller = async (sellerId) => {

        try {
            const response = await deleteDepartment(`/categories/${sellerId}`, 'DELETE');
            if (response.status === 200) {
                advertenceTrueMessage('Eliminado exitosamente');
            }
        } catch (error) {
            advertenceMessage("Error al eliminar");
        }
    }

    const handleEditClick = (department) => {
        setDepartmentId(department.id);
        setDepartmentChanges(department);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDepartmentChanges(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const editDepartment = async (e) => {
        e.preventDefault();
        try {
            const response = await updateDepartment(`/categories/${departmentId}`, 'PUT', departmentChanges);
            if (response.status === 200) {
                advertenceTrueMessage('Actualización exitosa');
                setDepartmentId(null)
            }
        } catch (error) {
            advertenceMessage('Error al actualizar');
        }
    }


    return (
        <Grid container mt={10}>
            <Grid xs={12} mb={3}>
                <Typography variant="h4">Lista de Departamentos</Typography>
            </Grid>
            <Grid xs={12} >
                <Paper elevation={0} sx={{ padding: '2em', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
                    <form onSubmit={editDepartment}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><Typography variant="h6">Código</Typography></TableCell>
                                        <TableCell align="left"><Typography variant="h6">Departamento</Typography></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataDepartment && dataDepartment.data && dataDepartment.data.length > 0 ? (
                                        dataDepartment.data.map((department) => (
                                            <TableRow key={department.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">{department.id}</TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {departmentId === department.id ?
                                                        <InputLight
                                                            nameValue='name'
                                                            value={department.name}
                                                            onChange={handleInputChange}
                                                            full={false} />
                                                        : department.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {departmentId === department.id ?
                                                        <ButtonPpal
                                                            typeButton='submit'
                                                            colorButton='primary'
                                                            textButton='Guardar'
                                                            onClickButton={editDepartment}
                                                        /> : <>
                                                            <IconButton onClick={() => handleEditClick(department)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => fetchDeleteSeller(department.id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell align="center" colSpan={3}>
                                                <Typography variant="h6">No hay departamentos registrados</Typography>
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