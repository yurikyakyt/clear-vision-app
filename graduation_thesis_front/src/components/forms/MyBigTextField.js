import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function MyBigTextField(props) {
    const { label, placeholder, name, control } = props;
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
                    multiline
                    rows={4}
                    placeholder={placeholder}
                    sx={{ width: '400px' }}
                />
            )}
        />
    );
}
