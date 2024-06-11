import Button from '@mui/material/Button';
import MyTextField from '../forms/MyTextField';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import MyPasswordInput from '../forms/MyPasswordInput';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
    let { setIsLogin, setRole } = props;
    const navigate = useNavigate();

    const submission = (data) => {
        // console.log(data);
        const uploadData = new FormData();
        uploadData.append('email', data.email);
        uploadData.append('password', data.password);

        fetch('http://127.0.0.1:8000/users/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((res) => {
                setRole(res.role);
                setIsLogin(true);
                navigate('/');
            })
            .catch((error) => console.log('Error:', error));
    };

    const defaultValues = {
        email: '',
        password: '',
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
                    Форма авторизации
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
                            width: 200 + 'px',
                            height: 200 + 'px',
                            margin: '0 auto',
                        }}
                    >
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
                        <Button type="submit" variant="contained">
                            Войти
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default LoginForm;
