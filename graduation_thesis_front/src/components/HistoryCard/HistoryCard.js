import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function HistoryCard(props) {
    let {
        file,
        name,
        surname,
        conditions,
        classification,
        handleDelete,
        probability,
    } = props;

    const values = { 1: 'Подтверждено', 2: 'Опровергнуто' };

    const [open, setOpen] = useState(false);
    const [doctorDesicions, setDoctorDesicions] = useState([]);
    const handleOpen = () => {
        setOpen(true);
        axios
            .get(
                `http://127.0.0.1:8000/api/doctorDesicion/get_doctor_desicions/?file=${encodeURIComponent(
                    file
                )}`
            )
            .then((response) => {
                setDoctorDesicions(response.data);
            })
            .catch((error) => console.log('Error:', error));
    };
    const handleClose = () => setOpen(false);

    console.log(doctorDesicions);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 4,
                borderRadius: '15px',
                padding: 3,
                width: 500,
                minHeight: '100px',
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
                    sx={{ marginLeft: '20px' }}
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
            </ListItem>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    data-file={file}
                    variant="outlined"
                    onClick={handleDelete}
                    color="error"
                    sx={{
                        height: '40px',
                        width: '100px',
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                    }}
                >
                    Delete
                </Button>
                <Button
                    onClick={handleOpen}
                    size="small"
                    sx={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '5%',
                    }}
                >
                    Оценки докторов
                </Button>
            </Box>
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
                        borderRadius: '10px',
                        boxShadow: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {doctorDesicions.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            Доктор
                                        </TableCell>
                                        <TableCell align="center">
                                            Оценка
                                        </TableCell>
                                        <TableCell align="center">
                                            Комментарий
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {doctorDesicions.map(
                                        (doctorDesicion, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="center">
                                                    {doctorDesicion.user.name +
                                                        ' ' +
                                                        doctorDesicion.user
                                                            .surname}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography
                                                        sx={{
                                                            display: 'inline',
                                                            color:
                                                                doctorDesicion.verified_status ===
                                                                1
                                                                    ? 'green'
                                                                    : 'red',
                                                        }}
                                                        component="span"
                                                    >
                                                        {doctorDesicion.verified_status ===
                                                        1
                                                            ? 'Подтверждено'
                                                            : 'Отклонено'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {doctorDesicion.comment}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Box
                            sx={{
                                backgroundColor: '#f5f5f5',
                                padding: '20px',
                                borderRadius: '10px',
                                textAlign: 'center',
                                boxShadow: 1,
                                color: '#555',
                                margin: '20px',
                            }}
                        >
                            На данный момент ни один из докторов <br />
                            не проверил ваш диагноз
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}

export default HistoryCard;
