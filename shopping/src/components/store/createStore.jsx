"use client"
import * as React from "react"
import { Box, } from "@mui/material";
import {
    Typography,
} from "@mui/material";
import { ButtonPpal, InputLight } from "../componentActions/componentAction";
import { ApiContext } from "@/context";

import Modal from '@mui/material/Modal';
import { advertenceMessage, advertenceTrueMessage } from "@/context/sweetAlert";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function CreateStore() {
    const { createStore } = React.useContext(ApiContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [activeSesion, setActiveSesion] = React.useState(false);


   React.useEffect(() => {
        const storeId = 'storeId'; // Ajusta el storeId según tu clave de localStorage
        const sessionValue = localStorage.getItem(storeId);
        if (sessionValue && sessionValue !== '0') {
            setActiveSesion(true);
        }
    }, [createStore]);

    const [formData, setFormData] = React.useState({
        name: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const CreateStore = async (e) => {
        e.preventDefault();

        const { name, email } = formData;

        try {
            const response = await createStore('/users', 'POST', {
                name,
                email,
            });
            if (response.data && response.data.data && response.data.data.id) {
                localStorage.setItem('storeId', response.data.data.id);
            }
            if (response.status === 200) {
                advertenceTrueMessage("creacion de tienda exitosa")
            }
            handleClose(false)
        } catch (error) {
            advertenceMessage("Error al crear tienda");
        }
    }

    return (
        <>
            {!activeSesion &&
                <ButtonPpal
                    onClickButton={handleOpen}
                    textButton='crear tienda'
                />
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{position:'absolute', zIndex:'1000000000000'}}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Crea tu tienda
                    </Typography>
                    <form onSubmit={CreateStore}>
                        <InputLight
                            nameValue='name'
                            name='Nombre'
                            onChange={handleInputChange}
                        />
                        <InputLight
                            nameValue='email'
                            name='E-mail'
                            onChange={handleInputChange}
                        />
                        <ButtonPpal
                            onClickButton={handleOpen}
                            textButton='crear tienda'
                            typeButton='submit'
                        />
                    </form>
                </Box>
            </Modal>
        </>
    );
}
