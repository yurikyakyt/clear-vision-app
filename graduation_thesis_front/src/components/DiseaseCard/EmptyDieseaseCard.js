import React from 'react';
import { Box, Typography } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

export default function EmptyDiseaseCard() {
    return (
        <div>
            <Box
                sx={{
                    padding: 4,
                    boxShadow: 3,
                    // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    background: 'linear-gradient(to right, #f9f9f9, #ffffff)',
                    maxWidth: '400px',
                    textAlign: 'center',
                    position: 'relative',
                    width: 360,
                    margin: 10 + 'px',
                    height: 400 + 'px',
                }}
            >
                <UpdateIcon
                    sx={{
                        fontSize: '40px',
                        color: '#3f51b5',
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        padding: '10px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                />
                <Typography
                    variant="h6"
                    color="textPrimary"
                    sx={{ marginTop: '40px' }}
                >
                    В следующем обновлении...
                </Typography>
            </Box>
        </div>
    );
}
