// import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import MyTextField from '../forms/MyTextField';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import MyPasswordInput from '../forms/MyPasswordInput';
import { useNavigate } from 'react-router-dom';
import MyRadioGroup from '../forms/MyRadioGroup';

function RegistrationForm() {
    const navigate = useNavigate();

    const submission = (data) => {
        const uploadData = new FormData();
        uploadData.append('name', data.name);
        uploadData.append('surname', data.surname);
        uploadData.append('email', data.email);
        uploadData.append('password', data.password);
        uploadData.append('role', data.role);
        uploadData.append('username', data.email);

        fetch('http://127.0.0.1:8000/users/register/', {
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
                navigate('/login');
            })
            .catch((error) => console.log('Error:', error));
    };

    const defaultValues = {
        name: '',
        surname: '',
        email: '',
        password: '',
        role: '',
    };
    const { handleSubmit, control } = useForm({ defaultValues: defaultValues });

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor: '#2365b0',
                    marginBottom: '10px',
                }}
            >
                <Typography sx={{ margin: '10px auto', color: '#fff' }}>
                    Форма регистрация
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
                }}
            >
                <form onSubmit={handleSubmit(submission)}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '0 auto',
                        }}
                    >
                        <Box
                            sx={{
                                marginBottom: '10px',
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
                                marginBottom: '10px',
                            }}
                        >
                            <MyTextField
                                label="Фамилия"
                                name="surname"
                                control={control}
                                placeholder="Введите вашу фамилию"
                                width={'30%'}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginBottom: '10px',
                            }}
                        >
                            <MyTextField
                                label="Email"
                                name="email"
                                control={control}
                                placeholder="Введите ваш email"
                                width={'30%'}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginBottom: '10px',
                            }}
                        >
                            <MyPasswordInput
                                label="Пароль"
                                name="password"
                                control={control}
                                placeholder="Введите ваш пароль"
                                width={'30%'}
                                sx={{ marginBottom: '10px' }}
                            />
                        </Box>
                        <MyRadioGroup
                            control={control}
                            name="role"
                            data={{ doctor: 'Врач', patient: 'Пациент' }}
                            RadioGroupTitle={'Ваша роль'}
                        />
                        <Button type="submit" variant="contained">
                            Зарегистрироваться
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default RegistrationForm;
