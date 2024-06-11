import DiseaseCard from '../DiseaseCard/DieseaseCard';
import EmptyDiseaseCard from '../DiseaseCard/EmptyDieseaseCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

function Info() {
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/disease/')
            .then((response) => {
                setDiseases(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the diseases!',
                    error
                );
            });
    }, []);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor: '#2365b0',
                    marginBottom: '20px',
                    boxShadow: 3,
                    borderRadius: '7px',
                }}
            >
                <Typography sx={{ margin: '10px auto', color: '#fff' }}>
                    Информация по заболеваниям
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    boxShadow: 3,
                    height: 'calc(100vh - 180px)',
                    borderRadius: '7px',
                    padding: 4,
                }}
            >
                {diseases.map((disease, i) => (
                    <div key={i}>
                        <DiseaseCard
                            img={disease.img}
                            title={disease.title}
                            short_description={disease.short_description}
                            description={disease.description}
                        />
                    </div>
                ))}
                <EmptyDiseaseCard />
            </Box>
        </Box>
    );
}

export default Info;
