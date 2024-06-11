import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from 'react-hook-form';

export default function MyRadioGroup(props) {
    let { control, name, data, RadioGroupTitle } = props;

    return (
        <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
            }}
        >
            <FormLabel>{RadioGroupTitle}</FormLabel>
            <Controller
                rules={{ required: true }}
                control={control}
                name={name}
                render={({ field }) => (
                    <RadioGroup
                        {...field}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {Object.entries(data).map(([key, value], i) => (
                            <FormControlLabel
                                key={i}
                                value={key}
                                control={<Radio />}
                                label={value}
                                labelPlacement="bottom"
                            />
                        ))}
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
}
