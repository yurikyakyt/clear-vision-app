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
import { useForm } from 'react-hook-form';
import MyRadioGroup from '../forms/MyRadioGroup';
import MyBigTextField from '../forms/MyBigTextField';

function UncheckedUserimage(props) {
    let {
        file,
        name,
        surname,
        email,
        handleUpdate,
        conditions,
        classification,
        probability,
    } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const defaultValues = {
        email: '',
        file: '',
        verifiedStatus: '',
        comment: '',
    };
    const { handleSubmit, control } = useForm({ defaultValues: defaultValues });

    const submission = (data) => {
        console.log(data);
        const uploadData = new FormData();
        uploadData.append('email', email);
        uploadData.append('file', file);
        uploadData.append('comment', data.comment);
        uploadData.append('verifiedStatus', data.verifiedStatus);

        fetch('http://127.0.0.1:8000/api/doctorDesicion/', {
            method: 'POST',
            body: uploadData,
        })
            .then((res) => {
                console.log(res.data);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                handleClose();
                handleUpdate(file);
                return res.json();
            })
            .catch((error) => console.log('Error:', error));
    };

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
                        bottom: '0px',
                        right: '0px',
                    }}
                >
                    <Button data-file={file} onClick={handleOpen} size="small">
                        Открыть информацию
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
                        width: 500,
                        bgcolor: 'background.paper',
                        // border: '1px solid #000',
                        borderRadius: '5%',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ width: '200px', borderRadius: 15 + '%' }}>
                        <img
                            src={`http://127.0.0.1:8000${file}`}
                            style={{
                                width: '100%',
                                borderRadius: 100 + '%',
                            }}
                            alt={file}
                        />
                    </Box>
                    <form onSubmit={handleSubmit(submission)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <MyRadioGroup
                                control={control}
                                name={'verifiedStatus'}
                                data={{ 1: 'Подтвердить', 2: 'Отклонить' }}
                                RadioGroupTitle={'Ваш вердикт'}
                            />
                            <MyBigTextField
                                control={control}
                                name={'comment'}
                                placeholder={'Напишите комментарий'}
                                label={'comment'}
                            />
                            <Button data-file={file} type="submit" size="small">
                                Проверить
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}

export default UncheckedUserimage;
