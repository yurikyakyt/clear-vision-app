import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

function СheckedUserimage(props) {
    let {
        file,
        name,
        surname,
        doctor_decision,
        conditions,
        classification,
        probability,
    } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // border: '1px solid #2365b0',
                boxShadow: 4,
                borderRadius: '15px',
                padding: 3,
                width: 500,
                marginBottom: '20px',
                position: 'relative',
            }}
        >
            <ListItem
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <ListItemAvatar sx={{ width: 200 + 'px', height: 200 + 'px' }}>
                    <Avatar
                        src={`http://127.0.0.1:8000${file}`}
                        alt="UserImage"
                        sx={{
                            width: 100 + '%',
                            height: 100 + '%',
                        }}
                    />
                </ListItemAvatar>
                <ListItemText
                    sx={{ marginLeft: '30px' }}
                    primary={name + ' ' + surname}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {conditions[classification]}{' '}
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {probability.toFixed(2)}
                                {'%'}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                    }}
                >
                    <Button onClick={handleOpen} size="small">
                        Проверить
                    </Button>
                </Box>
            </ListItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        // border: '1px solid #000',
                        boxShadow: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: 1,
                        }}
                    >
                        <Box
                            sx={{
                                marginBottom: '10px',
                            }}
                        >
                            <Typography
                                sx={{
                                    display: 'inline',
                                    fontWeight: 'bold',
                                    color: '#333',
                                }}
                                component="span"
                                variant="body1"
                            >
                                Статус:{' '}
                                <Typography
                                    sx={{
                                        display: 'inline',
                                        fontWeight: 'normal',
                                        color:
                                            doctor_decision.verified_status ===
                                            1
                                                ? 'green'
                                                : 'red',
                                    }}
                                    component="span"
                                >
                                    {doctor_decision.verified_status === 1
                                        ? 'Подтверждено'
                                        : 'Отклонено'}
                                </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    display: 'inline',
                                    fontWeight: 'bold',
                                    color: '#333',
                                }}
                                component="span"
                                variant="body1"
                            >
                                Комментарий:{' '}
                                <Typography
                                    sx={{
                                        display: 'inline',
                                        fontWeight: 'normal',
                                        color: '#555',
                                    }}
                                    component="span"
                                >
                                    {doctor_decision.comment}
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default СheckedUserimage;
