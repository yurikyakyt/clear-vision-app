import * as React from 'react';
import { Controller } from 'react-hook-form';
import { MuiFileInput } from 'mui-file-input';

export default function MyImageUpload(props) {
    const { label, name, placeholder, control } = props;
    return (
        <Controller
            control={control}
            rules={{
                validate: (value) => value instanceof File,
            }}
            render={({ field, fieldState }) => {
                return (
                    <MuiFileInput
                        {...field}
                        label={label}
                        placeholder={placeholder}
                        name={name}
                        helperText={fieldState.invalid ? 'File is invalid' : ''}
                        error={fieldState.invalid}
                        sx={{ width: '250px' }}
                    />
                );
            }}
            name="file"
        />
    );
}
