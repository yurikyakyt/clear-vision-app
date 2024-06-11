import * as React from 'react';
import List from '@mui/material/List';
import HistoryCard from './HistoryCard';

export default function HistoryCardList(props) {
    const { data, setHistoryCards, historyCards, conditions } = props;

    const handleDelete = (event) => {
        fetch(
            `http://127.0.0.1:8000/api/userimage/delete_userimage/?file=${encodeURIComponent(
                event.target.dataset.file
            )}`,
            {
                method: 'DELETE',
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                setHistoryCards(
                    historyCards.filter(
                        (historyCard) =>
                            historyCard.file !== event.target.dataset.file
                    )
                );
                return res.json();
            })
            .catch((error) => console.log('Error:', error));
    };
    return (
        <List
            sx={{
                width: '100%',
                padding: 4,
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
        >
            {data.map((historyCard, i) => (
                <HistoryCard
                    file={historyCard.file}
                    name={historyCard.name}
                    surname={historyCard.surname}
                    conditions={conditions}
                    classification={historyCard.classification}
                    key={i}
                    handleDelete={handleDelete}
                    probability={historyCard.probability}
                />
            ))}
        </List>
    );
}
