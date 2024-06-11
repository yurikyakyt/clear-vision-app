import * as React from 'react';
import { Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function MyCheckbox(props) {
    const { label, name, control } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox onChange={onChange} value={value} />}
                        label={label}
                    />
                </FormGroup>
            )}
        />
    );
}
