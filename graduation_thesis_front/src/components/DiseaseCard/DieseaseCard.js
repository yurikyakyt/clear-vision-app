import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function DiseaseCard(props) {
    const { title, description, img, short_description } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Card
                sx={{
                    position: 'relative',
                    width: 360,
                    margin: 10 + 'px',
                    height: 400 + 'px',

                    borderRadius: '12px',
                }}
            >
                <CardMedia
                    sx={{ height: 200 }}
                    image={`http://127.0.0.1:8000${img}`}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {short_description}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                    }}
                >
                    {/* <Button size="small">Share</Button> */}
                    <Button onClick={handleOpen} size="small">
                        Узнать больше
                    </Button>
                </CardActions>
            </Card>
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
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                    }}
                >
                    <div
                        style={{
                            width: 400 + 'px',
                            height: 400 + 'px',
                        }}
                    >
                        <img
                            src={`http://127.0.0.1:8000${img}`}
                            alt="диабетическая ретинопатия"
                            style={{
                                width: 100 + '%',
                                borderRadius: '100%',
                            }}
                        />
                    </div>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {description}
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}
