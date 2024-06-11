import { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryCardList from '../HistoryCard/HistoryCardList';
import { Box, Typography } from '@mui/material';

function History(props) {
    let { email } = props;
    const [historyCards, setHistoryCards] = useState([]);

    const conditions = [
        'Катаракта',
        'Диабетическая ретинопатия',
        'Глаукома',
        'Здоровый глаз',
    ];

    useEffect(() => {
        axios
            .get(
                `http://127.0.0.1:8000/api/userimage/get_history/?email=${encodeURIComponent(
                    email
                )}`
            )
            .then((response) => {
                setHistoryCards(response.data);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the diseases!',
                    error
                );
            });
    }, [email]);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor: '#2365b0',
                    marginBottom: '10px',
                    borderRadius: '7px',
                }}
            >
                <Typography sx={{ margin: '10px auto', color: '#fff' }}>
                    Ваша история
                </Typography>
            </Box>

            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: '7px',
                    minHeight: 'calc(100vh - 180px)',
                    padding: '20px',
                }}
            >
                {historyCards.length > 0 ? (
                    <HistoryCardList
                        data={historyCards}
                        setHistoryCards={setHistoryCards}
                        historyCards={historyCards}
                        conditions={conditions}
                    />
                ) : (
                    <Box
                        sx={{
                            fontSize: '18px',
                            color: '#666',
                            textAlign: 'center',
                            padding: '20px',
                            border: '2px dashed #ccc',
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        На данный момент ваша история пуста
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default History;
