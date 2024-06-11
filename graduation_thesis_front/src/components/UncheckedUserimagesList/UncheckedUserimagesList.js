import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import UncheckedUserimage from './UncheckedUserimage';

export default function UncheckedUserimagesList(props) {
    const { email, conditions } = props;

    let [uncheckedUserimages, setUncheckedUserimages] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://127.0.0.1:8000/api/userimage/get_unchecked_userimages/?email=${encodeURIComponent(
                    email
                )}`
            )
            .then((response) => {
                setUncheckedUserimages(response.data);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the diseases!',
                    error
                );
            });
    }, [email]);

    const handleUpdate = (file) => {
        setUncheckedUserimages((prevImages) =>
            prevImages.filter((image) => image.file !== file)
        );
    };

    console.log(uncheckedUserimages);

    return (
        <Box>
            {uncheckedUserimages.length > 0 ? (
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
                    {uncheckedUserimages.map((userimage, i) => (
                        <UncheckedUserimage
                            key={i}
                            file={userimage.file}
                            name={userimage.name}
                            surname={userimage.surname}
                            email={email}
                            handleUpdate={handleUpdate}
                            conditions={conditions}
                            classification={userimage.classification}
                            probability={userimage.probability}
                        />
                    ))}
                </List>
            ) : (
                <Box
                    sx={{
                        fontSize: '18px',
                        color: '#666',
                        textAlign: 'center',
                        padding: '20px',
                        border: '2px dashed #ccc',
                        borderRadius: '10px',
                        margin: '20px',
                        backgroundColor: '#f9f9f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    На данный момент нет доступных данных
                </Box>
            )}
        </Box>
    );
}
