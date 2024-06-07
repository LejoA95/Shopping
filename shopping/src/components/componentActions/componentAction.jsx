"use client"
import * as React from 'react';
import { Button, FormHelperText } from "@mui/material";
import { TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ButtonPpal = ({ colorButton, full, textButton, typeButton, iconoFinal, onClickButton }) => {
    return (
        <Button
            variant="contained"
            type={typeButton}
            color={colorButton}
            size="small"
            onClick={onClickButton}
            endIcon={iconoFinal}
            fullWidth={full}
            style={{ textTransform: 'inherit', fontWeight: '600', fontSize: '14px' }}>
            {textButton}
        </Button>

    );
}

const ButtonSec = ({ colorButton, full, textButton, typeButton, iconoFinal, onClickButton }) => {
    return (
        <Button
            variant="contained"
            type={typeButton}
            color={colorButton}
            endIcon={iconoFinal}
            size="small"
            onClick={onClickButton}
            fullWidth={full}
            style={{ textTransform: 'inherit', fontSize: '14px', border: '1px solid #b8d704' }}>
            {textButton}
        </Button>

    );
}

const ButtonSecOsc = ({ colorButton, full, textButton, typeButton, onClickButton }) => {
    return (
        <Button
            variant="contained"
            ype={typeButton}
            color={colorButton}
            size="small"
            onClick={onClickButton}
            fullWidth={full}
            style={{ textTransform: 'inherit', fontSize: '14px', border: '1px solid #144870' }}>
            {textButton}
        </Button>

    );
}

const ButtonWhite = ({ colorButton, full, textButton, typeButton, iconoFinal, onClickButton }) => {
    return (
        <Button
            variant="contained"
            type={typeButton}
            color={colorButton}
            size="small"
            onClick={onClickButton}
            endIcon={iconoFinal}
            fullWidth={full}
            style={{ textTransform: 'inherit', fontSize: '14px', border: '1px solid #E8E8E8' }}>
            {textButton}
        </Button>

    );
}

const ButtonText = ({ colorButton, full, textButton, typeButton, iconoFinal, onClickButton }) => {
    return (
        <Button
            variant="text"
            type={typeButton}
            color={colorButton}
            size="small"
            onClick={onClickButton}
            endIcon={iconoFinal}
            fullWidth={full}
            style={{ textTransform: 'inherit', fontSize: '14px' }}>
            {textButton}
        </Button>

    );
}
const ButtonTextBorder = ({ colorButton, full, textButton, typeButton, iconoFinal, onClickButton }) => {
    return (
        <Button
            variant="text"
            type={typeButton}
            color={colorButton}
            size="small"
            onClick={onClickButton}
            endIcon={iconoFinal}
            fullWidth={false}
            style={{ textTransform: 'inherit', fontSize: '13px', border: '1px solid #b8d704', padding: '0 .5em' }}>
            {textButton}
        </Button>

    );
}


// inputs


const InputLight = ({ name, nameguide, onChange, nameValue, typeInput, multiline, maxRows, value, disabled, textHelp, required }) => {
    return (
        <>
            <TextField
                label={name}
                placeholder={nameguide}
                variant="outlined"
                size="small"
                color="active"
                disabled={disabled}
                onChange={onChange}
                name={nameValue}
                defaultValue={value}
                required={required}
                error={false}
                multiline={multiline}
                rows={maxRows}
                type={typeInput}
                // focused
                fullWidth
            />
            <FormHelperText id={name} sx={{ fontSize: '10px', pl: .5 }}>
                {textHelp}
            </FormHelperText>
        </>
    )
}

const SelectLight = ({ name, nameValue, value, options, disabled, required, onChangeSelect, textHelp }) => {
    return (
        <FormControl fullWidth
            size='small'>
            <InputLabel id={name}>{name}</InputLabel>
            <Select
                labelId={name}
                defaultValue={value}
                name={nameValue}
                label={name}
                onChange={onChangeSelect}
                required={required}
                disabled={disabled}
            >
                {options && options.map((option, index) => (
                    <MenuItem key={index} sx={{ fontSize: '14px' }} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
            <FormHelperText id={name} sx={{ fontSize: '10px', pl: 0.5 }}>
                {textHelp}
            </FormHelperText>
        </FormControl>

    );
};

export { ButtonPpal, ButtonSec, ButtonSecOsc, ButtonWhite, ButtonText, InputLight, SelectLight, ButtonTextBorder };