import { Box, Typography } from '@mui/material';
import MyTextField from '../forms/MyTextField';
import MyImageUpload from '../forms/MyImageUpload';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import MyCheckbox from '../forms/MyCheckbox';
import CircularProgress from '@mui/material/CircularProgress';

function Home(props) {
    let { isLogin, name, surname, email, conditions } = props;
    let [result, setResult] = useState();
    let [probability, setProbability] = useState();
    let [eyeImage, setEyeImage] = useState();
    const [loading, setLoading] = useState(false);

    const defaultValues = {
        name: '',
        surname: '',
        file: '',
        permission: false,
    };
    const { handleSubmit, control } = useForm({ defaultValues: defaultValues });

    const submission = (data) => {
        // console.log(data);
        setLoading(true);
        const uploadData = new FormData();

        uploadData.append('name', data.name);
        uploadData.append('surname', data.surname);
        uploadData.append('file', data.file);
        if (isLogin) {
            uploadData.append('email', email);
            uploadData.append('permission', data.permission);
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setEyeImage(reader.result);
        };

        if (data.file) {
            reader.readAsDataURL(data.file);
        }

        fetch('http://127.0.0.1:8000/api/userimage/', {
            method: 'POST',
            body: uploadData,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((res) => {
                setResult(conditions[res.result]);
                setProbability(res.probability);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error:', error);
                setLoading(false);
            });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(submission)}>
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
                        Заполните форму
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        boxShadow: 3,
                        padding: 4,
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '7px',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    {isLogin && (
                        <Box>
                            <Box sx={{ marginBottom: '10px' }}>
                                Здравствуйте, {name} {surname}
                            </Box>
                            <Divider
                                variant="middle"
                                sx={{ marginBottom: '20px' }}
                            />
                        </Box>
                    )}
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                marginBottom: '30px',
                            }}
                        >
                            <MyTextField
                                label="Имя"
                                name="name"
                                control={control}
                                placeholder="Введите ваше имя"
                                width={'30%'}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                marginBottom: '30px',
                            }}
                        >
                            <MyTextField
                                label="Фамилия"
                                name="surname"
                                control={control}
                                placeholder="Введите вашу фамиилию"
                                width={'30%'}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginBottom: '30px',
                        }}
                    >
                        <MyImageUpload
                            placeholder="Insert a file"
                            label="Выберите файл"
                            control={control}
                            name="img"
                        />
                    </Box>
                    {isLogin && (
                        <Box>
                            <MyCheckbox
                                name="permission"
                                control={control}
                                label="Разрешаете ли вы докторам проверить результаты вашей диагностики"
                            />
                        </Box>
                    )}
                    <Box>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ width: '180px', margin: '0 auto' }}
                        >
                            Отправить
                        </Button>
                    </Box>
                </Box>
            </form>
            {eyeImage && (
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            backgroundColor: '#2365b0',
                            marginTop: '10px',
                            marginBottom: '20px',
                            borderRadius: '7px',
                            padding: '10px 0',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#fff',
                            }}
                        >
                            Результат
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            margin: '10px 0',
                            boxShadow: 3,
                            borderRadius: '10px',
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 310,
                                    height: 310,
                                    border: '1px solid #2365b0',
                                    padding: '10px',
                                    borderRadius: '15%',
                                    marginRight: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={eyeImage}
                                    alt="Uploaded"
                                    style={{
                                        width: 100 + '%',
                                        borderRadius: 100 + '%',
                                    }}
                                />
                            </Box>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Box
                                    sx={{
                                        width: 450,
                                        textAlign: 'left',
                                        fontSize: '16px',
                                        lineHeight: '1.5',
                                        color: '#333',
                                    }}
                                >
                                    <Typography variant="h6" component="div">
                                        Ваш предварительный диагноз это{' '}
                                        <strong>{result.split('.')[0]}</strong>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{ marginTop: '10px' }}
                                    >
                                        {result
                                            .split('.')
                                            .map((item, i) => i != 0 && item)}
                                        .<br /> Вероятность данного диагноза
                                        составляет{' '}
                                        <strong>
                                            {probability.toFixed(2)}%
                                        </strong>
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Typography
                            variant="body2"
                            component="p"
                            sx={{
                                marginTop: '20px',
                                marginBottom: '10px',
                                color: '#888',
                                fontStyle: 'italic',
                            }}
                        >
                            Данное приложение не дает гарантий. Для получения
                            точного диагноза обратитесь к врачу.
                        </Typography>
                    </Box>
                </Box>
            )}
        </div>
    );
}

export default Home;
