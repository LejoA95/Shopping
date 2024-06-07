"use client";
import * as React from 'react';
import { Box,  Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ButtonPpal } from "@/components/componentActions/componentAction";
import { styled } from '@mui/material/styles';

import { LineChart } from '@mui/x-charts/LineChart';


const ContainerScroll = styled(Container)(() => ({
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


export default function Home() {

  const uData = [4000, 3000, 2000, 2780, 1890, 2390];
  const pData = [2400, 1398, 7000, 3908, 4800, 3800];
  const xLabels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
  ];

  return (
    <ContainerScroll maxWidth="lg">
      <Grid container spacing={2} mt={12}>
        <Grid xs={12} lg={12}>
          <Paper elevation={0} sx={{ p: '1em', display: 'flex', maxWidth: '670px', bgcolor: 'terciario.main', borderRadius: '.5em', overflow: 'hidden', position: 'relative' }}>
            <Box maxWidth='450px' p='1em' display='flex' flexDirection='column' gap='1em' position='10000'>
              <Typography variant="h5">Bienvenido</Typography>
              <Typography variant="p">Bienvenido a SalesTrack la nueva herramienta para tu negocio, llegamos para facilitar los procesos financieros y de seguimiento de tu empresa.</Typography>
              <ButtonPpal
                textButton='Explorar'
                full={false}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid xs={12} lg={4}>
          <Paper elevation={6} sx={{ p: '1em', display: 'flex', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
            <Box display='flex' flexDirection='column' gap='1em'>
              <Typography variant='h6p'>Ingresos Totales</Typography>
              <Typography variant='h6'>+5%</Typography>
              <Typography variant='h4'>$ 5.456.123</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid xs={12} lg={4}>
          <Paper elevation={1} sx={{ p: '1em', display: 'flex', display: 'flex', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
            <Box display='flex' flexDirection='column' gap='1em'>
              <Typography variant='h6p'>Gastos Totales</Typography>
              <Typography variant='h6'>+2.6%</Typography>
              <Typography variant='h4'>$ 1.689.128</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid xs={12} lg={4}>
          <Paper elevation={1} sx={{ p: '1em', display: 'flex', display: 'flex', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
            <Box display='flex' flexDirection='column' gap='1em'>
              <Typography variant='h6p'>Pagos pendientes</Typography>
              <Typography variant='h6'>+1%</Typography>
              <Typography variant='h4'>$ 826.896</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid xs='auto'>
          <Paper elevation={6} sx={{ p: '1em', display: 'flex', boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' }}>
            <LineChart
              width={700}
              height={300}
              series={[
                { data: pData, label: 'ventas año presente' },
                { data: uData, label: 'ventas año anterior' },
              ]}
              xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
          </Paper>
        </Grid>
      </Grid>
    </ContainerScroll>
  );

}
