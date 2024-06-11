import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function MyPasswordInput(props) {
    const { label, placeholder, name, control, sx } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    onChange={onChange}
                    value={value}
                    label={label}
                    type="password"
                    variant="standard"
                    autoComplete="current-password"
                    placeholder={placeholder}
                    sx={sx}
                />
            )}
        />
    );
}
