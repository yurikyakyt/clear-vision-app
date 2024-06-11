import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import CheckedUserimage from './СheckedUserimage';

export default function CheckedUserimagesList(props) {
    const { email, conditions } = props;

    let [checkedUserimages, setСheckedUserimages] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://127.0.0.1:8000/api/userimage/get_checked_userimages/?email=${encodeURIComponent(
                    email
                )}`
            )
            .then((response) => {
                setСheckedUserimages(response.data);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the diseases!',
                    error
                );
            });
    }, [email]);

    console.log(checkedUserimages);

    return (
        <Box>
            {checkedUserimages.length > 0 ? (
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
                    {checkedUserimages.map((userimage, i) => (
                        <CheckedUserimage
                            key={i}
                            file={userimage.file}
                            name={userimage.name}
                            surname={userimage.surname}
                            doctor_decision={userimage.doctor_decision[0]}
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
                    На данный момент вы еще не проверили ни один диагноз
                </Box>
            )}
        </Box>
    );
}
